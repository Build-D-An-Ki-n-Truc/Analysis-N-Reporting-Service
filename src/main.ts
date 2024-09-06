import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  // const app = await NestFactory.createMicroservice<MicroserviceOptions>(
  //   AppModule,
  //   {
  //     transport: Transport.NATS,
  //     options: {
  //       servers: [process.env.NATS_URL || 'nats://nats'],
  //     },
  //   },
  // );
  // await app.listen();
  // // Open a port for health check
  // const PORT = process.env.PORT || 4020;
  // console.log(`Microservice is running on port ${PORT}`);
  // const healthCheck = await NestFactory.create(AppModule);
  // await healthCheck.listen(PORT);const app = await NestFactory.create(AppModule);

  const app = await NestFactory.create(AppModule);
  await app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.NATS,
    options: {
      servers: [process.env.NATS_URL || 'nats://nats'],
    },
  });

  await app.startAllMicroservices();
  await app.listen(process.env.PORT || 4020);
  console.log(`Microservice is running on port ${process.env.PORT || 4020}`);
}
bootstrap();
