import { Module } from '@nestjs/common';
import { IEventBusService } from '@/core/abstracts';
import { KafkaEventBusService } from './kafka-event-bus.service';

@Module({
  imports: [],
  providers: [
    {
      provide: IEventBusService,
      useClass: KafkaEventBusService,
    },
  ],
  exports: [KafkaEventBusService],
})
export class RabbitMQEventBusModule {}
