import { UserType } from '../types/UserType';
import { Message } from '../ui/message/Message';

export class UserToMessageDTO {
  private message: Message;

  constructor() {
    this.message = new Message();
  }

  public transportSenderAndReceiver(sender: UserType, receiver: UserType) {
    this.message.create(sender, receiver);
  }

  public transportUser(user: UserType) {
    this.message.get(user);
  }
}
