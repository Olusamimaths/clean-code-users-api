import { BusEvents } from '@/core/abstracts';
import { Injectable } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Injectable()
export class UserCreatedHandler {
  @MessagePattern(BusEvents.USER_CREATED)
  async handleUserCreated(@Payload() data: any) {
    console.log('User created event received:', data);
  }
}
