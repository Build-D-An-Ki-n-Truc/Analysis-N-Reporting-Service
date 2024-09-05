import { Module } from '@nestjs/common';
import { GrafanaController } from './grafana.controller';
import { GrafanaService } from './grafana.service';

@Module({
  imports: [],
  controllers: [GrafanaController],
  providers: [GrafanaService],
})
export class GrafanaModule {}
