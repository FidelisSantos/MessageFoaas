import { MessageType } from '../../types/MessageType';

export class MessageRepository {
  private messageRepository: Array<MessageType> = [];

  public create(message: MessageType) {
    this.messageRepository.push(message);
  }

  public getAll() {
    return this.messageRepository;
  }
}
