import { userRepository } from '../../user/repository/userRepository';
import { messageRepository } from '../repository/messageRepository';
import { TMessage } from '../../types/TMessage';
import { MessageModel } from '../../model/MessageModel';
import { UserModel } from '../../model/UserModel';

export class messageServices {

    private repoMessage : messageRepository;
    private repoUser : userRepository;

    constructor() {
        this.repoMessage = new messageRepository();
        this.repoUser = new userRepository();
    }

    public createMessage(sender: UserModel, receiver: UserModel, message : TMessage){
        if(!this.repoUser.userExists(receiver) || 
            !this.repoUser.userExists(sender) || sender.getCode() === receiver.getCode()) return false;
        let newMessage = new MessageModel(receiver, sender, message);
        this.repoMessage.createMessage(newMessage);
        return true;
    }

    public getAllMessage(){
        this.repoMessage.getAllMessage();
        return;
    }

    public getMessage(user: UserModel){
        let messages = this.repoMessage.getAllMessage();
        let messageSender : Array<MessageModel> = [];
        let messageReceiver : Array<MessageModel> = [];
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