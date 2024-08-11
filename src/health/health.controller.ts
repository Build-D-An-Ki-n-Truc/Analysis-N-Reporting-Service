import { Controller, Get, HttpStatus } from '@nestjs/common';

@Controller('health')
export class HealthController {
  constructor() {}

  @Get()
  getHealth() {
    return {
      payload: {
        type: ['info'],
        status: HttpStatus.OK,
        data: 'Service is up and running',
      },
    };
  }
}
