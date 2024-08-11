import { Module } from '@nestjs/common';
import { PrometheusModule } from './prometheus/prometheus.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [PrometheusModule, HealthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
