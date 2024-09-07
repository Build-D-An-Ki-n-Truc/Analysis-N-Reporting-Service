import { Module } from '@nestjs/common';
import { GrafanaModule } from './grafana/grafana.module';
import { HealthModule } from './health/health.module';
import { NatsClientModule } from './nats-client/nats-client.module';

@Module({
  imports: [GrafanaModule, HealthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
