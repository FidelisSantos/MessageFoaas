
import { TMessage } from '../types/TMessage';
import { UserModel } from './UserModel';

export class MessageModel {
    constructor(private receiver : UserModel, private sender : UserModel, private message : TMessage){
        this.receiver = receiver;
        this.message = message;
        this.sender = sender;
    }

    public getReceiver() {
        return this.receiver;
    }

    public getSender(){
        return this.sender;
    }

    public getText(){
        return this.message;
    }
}