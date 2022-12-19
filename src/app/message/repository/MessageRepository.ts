import { MessageModel } from '../../model/MessageModel';

export class MessageRepository {

    private messageRepository : Array<MessageModel> = [];

    public createMessage(message: MessageModel) {
        this.messageRepository.push(message);
    }

    public getAllMessage() {
        return this.messageRepository;
    }
}