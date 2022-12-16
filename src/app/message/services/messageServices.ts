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

    public createMessage(issuer: UserModel, receiver: UserModel, message : TMessage){
        if(!this.repoUser.userExists(receiver) || 
            !this.repoUser.userExists(issuer) || issuer.getCode() === receiver.getCode()) return false;
        let newMessage = new MessageModel(receiver, issuer, message);
        this.repoMessage.createMessage(newMessage);
        return true;
    }

    public getAllMessage(){
        this.repoMessage.getAllMessage();
    }

    public getMessage(user: UserModel){
        let messages = this.repoMessage.getAllMessage();
        let messageIssuer : Array<MessageModel> = [];
        let messageReceiver : Array<MessageModel> = [];
        messages.forEach(message =>{
            if(message.getReceiver().getCode() == user.getCode()){
                messageReceiver.push(message);
            }
            if(message.getIssuer().getCode() == user.getCode()){
                messageIssuer.push(message)
            }
        })
        return {
            messageIssuer,
            messageReceiver
        }
    }
}