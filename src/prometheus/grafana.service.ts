import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class GrafanaService {
    private readonly grafanaApiUrl = 'https://haimengg.grafana.net/api';
    private readonly token = process.env.GRAFANA_CLOUD_TOKEN || "token";

    constructor() {}

    private getHeaders() {
        return {
            Authorization: `Bearer ${this.token}`,
            'Content-Type': 'application/json',
        };
    }

    async getDashboard(uid: string): Promise<any> {
        try {
            const response = await axios.get(
                `${this.grafanaApiUrl}/dashboards/uid/${uid}`,
                { headers: this.getHeaders() },
            );
            return response.data;
        } catch (error) {
            console.log(error)
        }
    }

    async createSnapshot(dashboardJson: any, name: string, expires: number = 0): Promise<any> {
        try {
            const response = await axios.post(
            `${this.grafanaApiUrl}/snapshots`,
            {
                dashboard: dashboardJson,
                name: name,
                expires: expires,
            },
            { headers: this.getHeaders() },
            );
            return response.data;
        } catch (error) {
            console.log(error)
        }
    }


    async getPublicUrl(uid: string, snapshotName: string): Promise<string> {
        try {
            // Get the dashboard JSON using its UID
            const dashboardData = await this.getDashboard(uid);

            // Create a snapshot of the dashboard
            const snapshot = await this.createSnapshot(
                dashboardData.dashboard,
                snapshotName,
            );

            // Return the public URL
            return snapshot.url;
        } catch (error) {
            console.log(error)
        }
    }

    createHelloMessage(name: string): string {
        this.getPublicUrl("ddun02fisderka", "fsdfsd").then(text => console.log(text));
        
        return `Hello ${name}!`;
    }
}
