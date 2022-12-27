import { MessageRepository } from '../repository/MessageRepository';
import { TMessage } from '../../types/TMessage';
import { UserType } from '../../types/UserType';
import { MessageType } from '../../types/MessageType';

export class MessageService {
  private messageRepository: MessageRepository;

  constructor() {
    this.messageRepository = new MessageRepository();
  }

  public create(sender: UserType, receiver: UserType, message: TMessage) {
    try {
      const newMessage: MessageType = { receiver, sender, message };
      this.messageRepository.create(newMessage);
      return true;
    } catch {
      return false;
    }
  }

  public get(user: UserType) {
    const messages = this.messageRepository.getAll();
    const messageSender: Array<MessageType> = [];
    const messageReceiver: Array<MessageType> = [];
    messages.forEach((message) => {
      if (message.receiver.code == user.code) {
        messageReceiver.push(message);
      }
      if (message.sender.code == user.code) {
        messageSender.push(message);
      }
    });
    return {
      messageSender,
      messageReceiver
    };
  }
}
