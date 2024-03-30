import { IEventBusService } from '@/core/abstracts';

export class KafkaEventBusService extends IEventBusService {
  async send(topic: string, data: any): Promise<void> {
    console.log(`Sending to Kafka topic: ${topic}`);
  }

  async emit(topic: string, data: any): Promise<void> {
    console.log(`Publishing to Kafka topic: ${topic}`);
  }
}
