import { MessageRepository } from '../repository/MessageRepository';
import { TMessage } from '../../types/TMessage';
import { UserType } from '../../types/UserType';
import { MessageType } from '../../types/MessageType';

export class MessageServices {
  private messageRepository: MessageRepository;

  constructor() {
    this.messageRepository = new MessageRepository();
  }

  public createMessage(sender: UserType, receiver: UserType, message: TMessage) {
    try {
      const newMessage: MessageType = { receiver, sender, message };
      this.messageRepository.createMessage(newMessage);
      return true;
    } catch {
      return false;
    }
  }

  public getMessage(user: UserType) {
    const messages = this.messageRepository.getAllMessage();
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
