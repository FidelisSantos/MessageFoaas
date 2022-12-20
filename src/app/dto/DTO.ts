import { ListUser } from "../types/ListUser";
import { Message } from "../ui/message/Message";

export class DTO {
    private message : Message

    constructor() {
        this.message = new Message();
    }

    public createMessage(sender : ListUser, receiver : ListUser) {
        this.message.create(sender, receiver);
    }

    public getMessage(user : ListUser) {
        this.message.get(user);
    }
}