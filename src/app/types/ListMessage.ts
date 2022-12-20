import { ListUser } from "./ListUser"
import { TMessage } from "./TMessage";

export type ListMessage = {
    receiver: ListUser;
    sender: ListUser;
    message: TMessage;
}