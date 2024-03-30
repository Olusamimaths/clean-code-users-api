export abstract class IEventBusService {
  // Abstract methods

  /**
   * Sends an event to the event bus.
   * @param topic The topic or channel to which the event should be sent.
   * @param data The data or payload of the event.
   */
  abstract send(topic: string, data: any): Promise<void>;

  /**
   * Emits an event to the event bus.
   * @param topic The topic or channel to which the event should be emitted.
   * @param data The data or payload of the event.
   */
  abstract emit(topic: string, data: any): Promise<void>;
}

export enum BusEvents {
  USER_CREATED = 'user.created',
}
