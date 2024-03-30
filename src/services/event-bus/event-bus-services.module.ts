import { RabbitMQEventBusModule } from '@/frameworks/event-bus/rabbitmq';
import { Module } from '@nestjs/common';

@Module({
  imports: [RabbitMQEventBusModule],
  exports: [RabbitMQEventBusModule],
})
export class EventBusServicesModule {}
