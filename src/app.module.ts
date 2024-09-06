import { Module } from '@nestjs/common';
import { GrafanaModule } from './grafana/grafana.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [GrafanaModule, HealthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
