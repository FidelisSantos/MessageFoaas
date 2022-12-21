import { UserRepository } from '../../user/repository/UserRepository';
import { MessageRepository } from '../repository/MessageRepository';
import { TMessage } from '../../types/TMessage';
import { UserType } from '../../types/UserType';
import { MessageType } from '../../types/MessageType';

export class MessageServices {
  private messageRepository: MessageRepository;
  private userRepository: UserRepository;

  constructor() {
    this.messageRepository = new MessageRepository();
    this.userRepository = new UserRepository();
  }

  public createMessage(
    sender: UserType,
    receiver: UserType,
    message: TMessage
  ) {
    if (
      !this.userRepository.userExists(receiver) ||
      !this.userRepository.userExists(sender) ||
      sender.code === receiver.code
    )
      return false;
    const newMessage: MessageType = { receiver, sender, message };
    this.messageRepository.createMessage(newMessage);
    return true;
  }

  public getAllMessage() {
    this.messageRepository.getAllMessage();
    return;
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
