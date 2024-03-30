import { Module } from '@nestjs/common';
import { IEventBusService } from '@/core/abstracts';
import { RabbitMQEventBusService } from './rabbitmq-event-bus.service';
import { CustomProviderTokensEnum } from '@/lib';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { UserCreatedHandler } from './handlers';

@Module({
  imports: [],
  providers: [
    {
      provide: CustomProviderTokensEnum.SUBSCRIBERS_SERVICE,
      useFactory: (configService: ConfigService) => {
        const user = configService.get('rabbitmq.user');
        const password = configService.get('rabbitmq.password');
        const host = configService.get('rabbitmq.host');
        const queueName = configService.get('rabbitmq.queueName');

        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [`amqp://${user}:${password}@${host}`],
            queue: queueName,
            queueOptions: {
              durable: true,
            },
          },
        });
      },
      inject: [ConfigService],
    },
    {
      provide: IEventBusService,
      useClass: RabbitMQEventBusService,
    },
    UserCreatedHandler,
  ],
  exports: [IEventBusService, CustomProviderTokensEnum.SUBSCRIBERS_SERVICE],
})
export class RabbitMQEventBusModule {}
