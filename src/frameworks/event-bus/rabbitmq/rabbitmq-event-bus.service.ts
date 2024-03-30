import { IEventBusService } from '@/core/abstracts';
import { CustomProviderTokensEnum } from '@/lib';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

export class RabbitMQEventBusService extends IEventBusService {
  constructor(
    @Inject(CustomProviderTokensEnum.SUBSCRIBERS_SERVICE)
    private subscriberService: ClientProxy,
  ) {
    super();
  }

  async send(topic: string, data: any): Promise<void> {
    console.log(`Sending to RabbitMQ topic: ${topic}`);
    this.subscriberService.send(topic, data);
  }

  async emit(topic: string, data: any): Promise<void> {
    console.log(`Publishing to RabbitMQ topic: ${topic}`);
    this.subscriberService.emit(topic, data);
  }
}
