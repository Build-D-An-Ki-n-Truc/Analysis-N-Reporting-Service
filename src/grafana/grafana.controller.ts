import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { GrafanaService } from './grafana.service';
import { MessageContextDto } from './dtos/message.dto';
import { ResponsePayload } from './dtos/response.dto';
import { from, Observable, map, catchError } from 'rxjs';

@Controller()
export class GrafanaController {
  constructor(private readonly service: GrafanaService) {}

  private handleError(error: any): ResponsePayload<any> {
    return {
      payload: {
        type: ['info'],
        status: HttpStatus.BAD_REQUEST,
        data: error.message ?? 'Unexpected error',
      },
    };
  }

  private wrapResponse<T>(
    data: T,
    status: HttpStatus = HttpStatus.OK,
  ): ResponsePayload<T> {
    return {
      payload: {
        type: ['info'],
        status,
        data,
      },
    };
  }

  // @MessagePattern({
  //   service: 'monitor',
  //   endpoint: 'gamesMetrics',
  //   method: 'GET',
  // })
  // getGamesMetrics() {
  //   return from(this.service.getGamesMetricsDashboard()).pipe(
  //     map((games) => this.wrapResponse(games)),
  //     catchError((error) => from([this.handleError(error)])),
  //   );
  // }

  // @MessagePattern({
  //   service: 'monitor',
  //   endpoint: 'playersMetrics',
  //   method: 'GET',
  // })
  // getPlayersMetrics() {
  //   return from(this.service.getPlayersMetricsDashboard()).pipe(
  //     map((games) => this.wrapResponse(games)),
  //     catchError((error) => from([this.handleError(error)])),
  //   );
  // }

  // @MessagePattern({
  //   service: 'monitor',
  //   endpoint: 'brandsMetrics',
  //   method: 'GET',
  // })
  // getBrandsMetrics() {
  //   return from(this.service.getBrandsMetricsDashboard()).pipe(
  //     map((games) => this.wrapResponse(games)),
  //     catchError((error) => from([this.handleError(error)])),
  //   );
  // }

  @MessagePattern({
    service: 'monitor',
    endpoint: 'activeEvents',
    method: 'GET',
  })
  getActiveEvents(): Observable<ResponsePayload<any>> {
    return from(this.service.getActiveEvents()).pipe(
      map((games) => this.wrapResponse(games)),
      catchError((error) => from([this.handleError(error)])),
    );
  }

  @MessagePattern({
    service: 'monitor',
    endpoint: 'activeGames',
    method: 'GET',
  })
  getActiveGames() {
    return from(this.service.getActiveGames()).pipe(
      map((games) => this.wrapResponse(games)),
      catchError((error) => from([this.handleError(error)])),
    );
  }

  @MessagePattern({
    service: 'monitor',
    endpoint: 'gamePlayedTimes',
    method: 'GET',
  })
  getGamePlayedTimes() {
    return from(this.service.getGamePlayedTimes()).pipe(
      map((games) => this.wrapResponse(games)),
      catchError((error) => from([this.handleError(error)])),
    );
  }

  @MessagePattern({
    service: 'monitor',
    endpoint: 'discountStatus',
    method: 'GET',
  })
  getDiscountStatus(@Payload() message: MessageContextDto) {
    if (!message.params.brandId) {
        return {
            payload: {
                type: ['info'],
                status: HttpStatus.BAD_REQUEST,
                data: "Missing params in [brand_id, event_id]"
            }
        }
    }
    return from(this.service.getDiscountStatus(message.params.brandId)).pipe(
      map((games) => this.wrapResponse(games)),
      catchError((error) => from([this.handleError(error)])),
    );
  }
}
