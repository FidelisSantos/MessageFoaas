import { UserRepository } from '../../user/repository/UserRepository';
import { MessageRepository } from '../repository/MessageRepository';
import { TMessage } from '../../types/TMessage';
import { MessageModel } from '../../model/MessageModel';
import { UserModel } from '../../model/UserModel';

export class MessageServices {

    private messageRepository : MessageRepository;
    private userRepository : UserRepository;

    constructor() {
        this.messageRepository = new MessageRepository();
        this.userRepository = new UserRepository();
    }

    public createMessage(sender: UserModel, receiver: UserModel, message : TMessage){
        if(!this.userRepository.userExists(receiver) || 
            !this.userRepository.userExists(sender) || sender.getCode() === receiver.getCode()) return false;
        const newMessage = new MessageModel(receiver, sender, message);
        this.messageRepository.createMessage(newMessage);
        return true;
    }

    public getAllMessage(){
        this.messageRepository.getAllMessage();
        return;
    }

    public getMessage(user: UserModel){
        const messages = this.messageRepository.getAllMessage();
        const messageSender : Array<MessageModel> = [];
        const messageReceiver : Array<MessageModel> = [];
        messages.forEach(message =>{
            if(message.getReceiver().getCode() == user.getCode()){
                messageReceiver.push(message);
            }
            if(message.getSender().getCode() == user.getCode()){
                messageSender.push(message)
            }
        })
        return {
            messageSender,
            messageReceiver
        }
    }
}