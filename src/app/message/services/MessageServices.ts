import { UserRepository } from '../../user/repository/UserRepository';
import { MessageRepository } from '../repository/MessageRepository';
import { TMessage } from '../../types/TMessage';
import { ListUser } from '../../types/ListUser';
import { ListMessage } from '../../types/ListMessage';

export class MessageServices {

    private messageRepository : MessageRepository;
    private userRepository : UserRepository;

    constructor() {
        this.messageRepository = new MessageRepository();
        this.userRepository = new UserRepository();
    }

    public createMessage(sender: ListUser, receiver: ListUser, message : TMessage) {
        if(!this.userRepository.userExists(receiver) || 
            !this.userRepository.userExists(sender) || 
            sender.code === receiver.code) return false;
        const newMessage : ListMessage = {receiver, sender, message};
        this.messageRepository.createMessage(newMessage);
        return true;
    }

    public getAllMessage() {
        this.messageRepository.getAllMessage();
        return;
    }

    public getMessage(user: ListUser) {
        const messages = this.messageRepository.getAllMessage();
        const messageSender : Array<ListMessage> = [];
        const messageReceiver : Array<ListMessage> = [];
        messages.forEach(message =>{
            if(message.receiver.code == user.code) {
                messageReceiver.push(message);
            }
            if(message.sender.code == user.code) {
                messageSender.push(message)
            }
        })
        return {
            messageSender,
            messageReceiver
        }
    }
}