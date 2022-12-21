import { UserType } from './UserType';
import { TMessage } from './TMessage';

export type MessageType = {
  receiver: UserType;
  sender: UserType;
  message: TMessage;
};
