import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PrometheusService } from './prometheus.service';
import { MessageContextDto } from './dtos/message.dto';

@Controller()
export class PrometheusController {
  constructor(private readonly service: PrometheusService) {}

  @MessagePattern({
    service: 'monitor',
    endpoint: 'game',
    method: 'GET',
  })
  getGameMetrics(@Payload() message: MessageContextDto) {
    console.log('getHello', message);
    return {
      payload: {
        type: ['info'],
        status: HttpStatus.OK,
        data: this.service.createHelloMessage(message.params.name),
      },
    };
  }
}
