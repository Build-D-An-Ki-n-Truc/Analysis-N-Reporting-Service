import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { uids } from 'src/data/uidData';
import { dashboards } from 'src/data/dashboardData';
import { Scope } from '@nestjs/common';

@Injectable()
export class GrafanaService {
    private readonly grafanaCloudUrl = process.env.GRAFANA_CLOUD_URL;
    private readonly grafanaLocalUrl = process.env.GRAFANA_LOCAL_URL;
    private readonly cloudToken = process.env.GRAFANA_CLOUD_TOKEN;
    private readonly activeEventsUID = uids.activeEvents
    private readonly activeGamesUID = uids.activeGames
    private readonly gamePlayedTimesUID = uids.gamePlayedTimes

    constructor() {
      this.generateLocalToken().then((token: string) => {
        console.log(token)
        // this.createDashboards(token)
      })
    }

    private getAuthHeaders(token: string) {
      return {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      };
    }

    private async generateLocalToken(): Promise<string> {
      try {
        const serviceaccountsListResponse: AxiosResponse = await axios.get(`http://admin:admin@${this.grafanaLocalUrl}/api/serviceaccounts/search?perpage=10&page=1&query=monitor-service`,
          { headers: {'Content-Type': 'application/json'} }
        )
        let serviceaccountsLength = serviceaccountsListResponse.data.totalCount

        let serviceAccountId: number
        if (serviceaccountsLength > 0) {
          serviceAccountId = serviceaccountsListResponse.data.serviceAccounts[0].id
        }
        else {
          const createServiceAccountBody = {
            "name": "monitor-service",
            "role": "Admin"
          }
          const createServiceAccountResponse: AxiosResponse = await axios.post(`http://admin:admin@${this.grafanaLocalUrl}/api/serviceaccounts`, createServiceAccountBody,
            { headers: {'Content-Type': 'application/json'}}
          )
          serviceAccountId = createServiceAccountResponse.data.id
        }

        const tokenListResponse: AxiosResponse = await axios.get(`http://admin:admin@${this.grafanaLocalUrl}/api/serviceaccounts/${serviceAccountId}/tokens`,
          { headers: {'Content-Type': 'application/json'} }
        )
        if (tokenListResponse.data.length > 0) {
          await axios.delete(`http://admin:admin@${this.grafanaLocalUrl}/api/serviceaccounts/${serviceAccountId}/tokens/${tokenListResponse.data[0].id}`,
            { headers: {'Content-Type': 'application/json'} }
          )
        }
        const createTokenBody = {
          "name": "monitor-service-token"
        }
        const createTokenResponse: AxiosResponse = await axios.post(`http://admin:admin@${this.grafanaLocalUrl}/api/serviceaccounts/${serviceAccountId}/tokens`, createTokenBody,
          { headers: {'Content-Type': 'application/json'} }
        )
        let localToken = createTokenResponse.data.key
        
        return localToken
      } catch (error) {
        console.log(error)
      }
    }

    // private async createDashboards(localToken: string) {
    //   for (let dashboardData of dashboards) {
    //     const createDashboardResponse: AxiosResponse = await axios.post(`http://${this.grafanaLocalUrl}/api/dashboards/db`, dashboardData,
    //       { headers: this.getAuthHeaders(localToken) }
    //     )
    //     let data = createDashboardResponse.data
        
    //     switch (dashboardData.dashboard.title) {
    //       case ("Games Metrics Data"):
    //         uids.gamesMetricsDashboard = data.uid
    //         break
    //       case ("Players Metrics Data"):
    //         uids.playersDBDashboard = data.uid
    //         break
    //       case ("Brands Metrics Data"):
    //         uids.brandsMetricsDashboard = data.uid
    //         break
    //     }
    //   }
    // }

    async getActiveGames(): Promise<string> {
      try {
        console.log("1")
        const response: AxiosResponse = await axios.get(`${this.grafanaCloudUrl}/api/dashboards/uid/${this.activeGamesUID}/public-dashboards`,
          { headers: this.getAuthHeaders(this.cloudToken) }
        )
        let accessToken = response.data.accessToken
        console.log("2")
        
        let publicUrl = `${this.grafanaCloudUrl}/public-dashboards/${accessToken}`
        return publicUrl
      } catch (error) {
        console.log(error)
      }
    }

    async getActiveEvents(): Promise<string> {
      try {
        const response: AxiosResponse = await axios.get(`${this.grafanaCloudUrl}/api/dashboards/uid/${this.activeEventsUID}/public-dashboards`,
          { headers: this.getAuthHeaders(this.cloudToken) }
        )
        let accessToken = response.data.accessToken
        
        let publicUrl = `${this.grafanaCloudUrl}/public-dashboards/${accessToken}`
        return publicUrl
      } catch (error) {
        console.log(error)
      }
    }

    // async getBrandsMetricsDashboard(): Promise<string> {
    //   try {
    //     const response: AxiosResponse = await axios.get(`http://${this.grafanaLocalUrl}/api/dashboards/uid/${uids.brandsMetricsDashboard}/public-dashboards`,
    //       { headers: this.getAuthHeaders(this.cloudToken) }
    //     )
    //     let accessToken = response.data.accessToken
        
    //     let publicUrl = `${this.grafanaCloudUrl}/public-dashboards/${accessToken}`
    //     return publicUrl
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }

    // async getGamesMetricsDashboard(): Promise<string> {
    //   try {
    //     const response: AxiosResponse = await axios.get(`http://${this.grafanaLocalUrl}/api/dashboards/uid/${uids.gamesMetricsDashboard}/public-dashboards`,
    //       { headers: this.getAuthHeaders(this.cloudToken) }
    //     )
    //     let accessToken = response.data.accessToken
        
    //     let publicUrl = `${this.grafanaCloudUrl}/public-dashboards/${accessToken}`
    //     return publicUrl
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }

    // async getPlayersMetricsDashboard(): Promise<string> {
    //   try {
    //     const response: AxiosResponse = await axios.get(`http://${this.grafanaLocalUrl}/api/dashboards/uid/${uids.playersMetricsDashboard}/public-dashboards`,
    //       { headers: this.getAuthHeaders(this.cloudToken) }
    //     )
    //     let accessToken = response.data.accessToken
        
    //     let publicUrl = `${this.grafanaCloudUrl}/public-dashboards/${accessToken}`
    //     return publicUrl
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }

    async getGamePlayedTimes(): Promise<string> {
      try {
        const response: AxiosResponse = await axios.get(`${this.grafanaCloudUrl}/api/dashboards/uid/${this.gamePlayedTimesUID}/public-dashboards`,
          { headers: this.getAuthHeaders(this.cloudToken) }
        )
        let accessToken = response.data.accessToken
        
        let publicUrl = `${this.grafanaCloudUrl}/public-dashboards/${accessToken}`
        return publicUrl
      } catch (error) {
        console.log(error)
      }
    }
}
