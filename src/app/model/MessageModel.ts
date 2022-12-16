
import { TMessage } from '../types/TMessage';
import { UserModel } from './UserModel';

export class MessageModel {
    constructor(private receiver : UserModel, private issuer : UserModel, private message : TMessage){
        this.receiver = receiver;
        this.message = message;
        this.issuer = issuer;
    }

    public getReceiver() {
        return this.receiver;
    }

    public getIssuer(){
        return this.issuer;
    }

    public getText(){
        return this.message;
    }
}