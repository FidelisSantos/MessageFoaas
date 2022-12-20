import { ListMessage } from '../../types/ListMessage';

export class MessageRepository {

    private messageRepository : Array<ListMessage> = [];

    public createMessage(message: ListMessage) {
        this.messageRepository.push(message);
    }

    public getAllMessage() {
        return this.messageRepository;
    }
}