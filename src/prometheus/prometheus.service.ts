import { Injectable } from '@nestjs/common';

@Injectable()
export class PrometheusService {
  constructor() {}

  createHelloMessage(name: string): string {
    return `Hello ${name}!`;
  }
}
