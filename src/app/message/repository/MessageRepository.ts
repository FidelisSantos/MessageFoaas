import {MessageType} from '../../types/MessageType';

export class MessageRepository {

    private messageRepository : Array<MessageType> = [];

    public createMessage(message: MessageType) {
        this.messageRepository.push(message);
    }

    public getAllMessage() {
        return this.messageRepository;
    }
}