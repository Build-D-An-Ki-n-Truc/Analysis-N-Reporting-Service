import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { GrafanaService } from './grafana.service';
import { MessageContextDto } from './dtos/message.dto';

@Controller()
export class GrafanaController {
  constructor(private readonly service: GrafanaService) {}

  @MessagePattern({
    service: 'monitor',
    endpoint: 'gamesMetrics',
    method: 'GET',
  })
  getGamesMetrics() {
    return {
      payload: {
        type: ['info'],
        status: HttpStatus.OK,
        data: this.service.getGamesMetricsDashboard(),
      },
    };
  }

  @MessagePattern({
    service: 'monitor',
    endpoint: 'playersMetrics',
    method: 'GET',
  })
  getPlayersMetrics() {
    return {
      payload: {
        type: ['info'],
        status: HttpStatus.OK,
        data: this.service.getPlayersMetricsDashboard(),
      },
    };
  }

  @MessagePattern({
    service: 'monitor',
    endpoint: 'brandsMetrics',
    method: 'GET',
  })
  getBrandsMetrics() {
    return {
      payload: {
        type: ['info'],
        status: HttpStatus.OK,
        data: this.service.getBrandsMetricsDashboard(),
      },
    };
  }

  @MessagePattern({
    service: 'monitor',
    endpoint: 'gamesDB',
    method: 'GET',
  })
  getGamesDB() {
    return {
      payload: {
        type: ['info'],
        status: HttpStatus.OK,
        data: this.service.getGamesDBDashboard(),
      },
    };
  }

  @MessagePattern({
    service: 'monitor',
    endpoint: 'playersDB',
    method: 'GET',
  })
  getPlayersDB() {
    return {
      payload: {
        type: ['info'],
        status: HttpStatus.OK,
        data: this.service.getPlayersDBDashboard(),
      },
    };
  }

  @MessagePattern({
    service: 'monitor',
    endpoint: 'brandsDB',
    method: 'GET',
  })
  getBrandsDB() {
    return {
      payload: {
        type: ['info'],
        status: HttpStatus.OK,
        data: this.service.getBrandsDBDashboard(),
      },
    };
  }
}
