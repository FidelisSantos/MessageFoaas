import { initializeApp, ready } from '../../..';
import { messageServices } from '../../message/services/messageServices';
import { UserModel } from '../../model/UserModel';
import { TMessage } from '../../types/TMessage';
import { Requests } from '../../requests/requests';

export class Message{
    private messageServices: messageServices;
    private requests: Requests;
    private subject: string = "";
    private text: string = "";
    private messageFoaas : boolean = false;

    constructor( ){
        this.messageServices = new messageServices();
        this.requests = new Requests();
    }

    public createMessage(sender: UserModel , receiver: UserModel){
        this.typeMessage(sender , receiver);
        return;
    }

    public getMessage(user: UserModel){
        this.getUserMessages(user);
        return;
    }
    
    private getUserMessages(user: UserModel){
        const {messageSender , messageReceiver} = this.messageServices.getMessage(user);
        console.log("\n");
        if(messageSender.length != 0 || messageReceiver.length != 0) {
            if(messageSender.length > 0 ){
                console.log(`Mensagens enviadas por ${user.getName()}, Código ${user.getCode()} \n`);
                messageSender.forEach(message => {
                    if(user.getCode() == message.getSender().getCode()){
                        console.log(`Para -> Usuário: ${message.getReceiver().getName()}, Código: ${message.getSender().getCode()} `);
                        console.log(`Assunto: ${message.getText().subject}`);
                        console.log(`Mensagem: ${message.getText().message} \n`);
                    }
                });
            }
             if(messageReceiver.length > 0 ){

                console.log(`Mensagens recebidas por ${user.getName()}, Código ${user.getCode()} \n`);
                messageReceiver.forEach(message => {
                    if(user.getCode() == message.getReceiver().getCode()){
                        console.log(`De -> Usuário: ${message.getSender().getName()}, Código: ${message.getSender().getCode()} `);
                        console.log(`Assunto: ${message.getText().subject}`);
                        console.log(`Mensagem: ${message.getText().message} \n`);
                    }
                });
            }
        }else{
            console.log("Usuário não enviou e nem recebeu mensagens \n");
        }
        initializeApp();
        return;
    }

    private typeMessage(sender: UserModel , receiver: UserModel){
        ready.question("Deseja enviar uma mensagem apimentada?: \n 1- SIM \n 2- NÃO \n -> ", (answer) =>{
            console.log("\n");
            switch(answer){
                case '1':
                    this.messageFoaas = true;
                    this.getSubject(sender, receiver);
                    break;
                case '2':
                    this.messageFoaas = false;
                    this.getSubject(sender, receiver);
                    break;
                default:
                    console.log("Opção inválida \n");
                    this.typeMessage(sender, receiver);
                    break;
            }
        })
    }



    private getSubject(sender: UserModel , receiver: UserModel){
     ready.question("Informe o assunto da Mensagem:  ", (answer) => {
            console.log("\n");
            if(answer != undefined && answer != null && answer != ""){
                this.subject =  answer;
                this.getText(sender , receiver);
                return;   
            }
            console.log("Assunto inválido \n");
            this.getSubject(sender , receiver);
            return;
        });
    }

    private async getText(sender: UserModel , receiver: UserModel){
        if(this.messageFoaas) {
            this.text = await this.requests.ApiFoaas(sender, receiver);
            this.sendMessage(sender , receiver);
            return;
        }
        ready.question("Informe o texto da mensagem:  ", (answer) => {
            console.log("\n");
            if(answer != undefined && answer != null && answer != ""){
                this.text =  answer;
                this.sendMessage(sender , receiver);
                return;
            }
            console.log("Texto inválido \n");
            this.getText(sender , receiver);
            return;
        });
    }

    private sendMessage(sender: UserModel , receiver: UserModel){
        const message : TMessage = {
            subject: this.subject,
            message: this.text
        }
        if(this.messageServices.createMessage(sender, receiver, message)){
            console.log("Mensagem enviada \n")
        }else{
            console.log("Erro ao enviar Mensagem \n");
        } 
        initializeApp();
        return;
    }
}