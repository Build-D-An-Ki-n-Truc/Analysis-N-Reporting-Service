import { Module } from '@nestjs/common';
import { GrafanaModule } from './prometheus/grafana.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [GrafanaModule, HealthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
