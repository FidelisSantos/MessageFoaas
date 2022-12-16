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

    public createMessage(issuer: UserModel , receiver: UserModel){
        this.typeMessage(issuer , receiver);
        return;
    }

    public getMessage(user: UserModel){
        this.getUserMessages(user);
        return;
    }
    
    private getUserMessages(user: UserModel){
        const {messageIssuer , messageReceiver} = this.messageServices.getMessage(user);
        if(messageIssuer.length != 0 || messageReceiver.length != 0) {
            if(messageIssuer.length > 0 ){
                console.log("\n");
                console.log(`Mensagens enviadas por ${user.getName()}, Código ${user.getCode()}`);
                console.log("\n");
                messageIssuer.forEach(message => {
                    if(user.getCode() == message.getIssuer().getCode()){
                        console.log(`Para -> Usuário: ${message.getReceiver().getName()}, Código: ${message.getIssuer().getCode()} `);
                        console.log(`Assunto: ${message.getText().subject}`);
                        console.log(`Mensagem: ${message.getText().message}`);
                        console.log("\n");
                    }
                });
            }
             if(messageReceiver.length > 0 ){
                console.log("\n");
                console.log(`Mensagens recebidas por ${user.getName()}, Código ${user.getCode()}`);
                console.log("\n");
                messageReceiver.forEach(message => {
                    if(user.getCode() == message.getReceiver().getCode()){
                        console.log(`De -> Usuário: ${message.getIssuer().getName()}, Código: ${message.getIssuer().getCode()} `);
                        console.log(`Assunto: ${message.getText().subject}`);
                        console.log(`Mensagem: ${message.getText().message}`);
                        console.log("\n");
                    }
                });
            }
        }else{
            console.log("Usuário não enviou e nem recebeu mensagens");
            console.log("\n");
        }
        initializeApp();
        return;
    }

    private typeMessage(issuer: UserModel , receiver: UserModel){
        ready.question("Deseja enviar uma mensagem apimentada?: \n 1- SIM \n 2- NÃO \n -> ", (answer) =>{
            console.log("\n");
            switch(answer){
                case '1':
                    this.messageFoaas = true;
                    this.getSubject(issuer, receiver);
                    break;
                case '2':
                    this.messageFoaas = false;
                    this.getSubject(issuer, receiver);
                    break;
                default:
                    console.log("Opção inválida");
                    console.log("\n");
                    this.typeMessage(issuer, receiver);
                    break;
            }
        })
    }



    private getSubject(issuer: UserModel , receiver: UserModel){
     ready.question("Informe o assunto da Mensagem:  ", (answer) => {
            console.log("\n");
            if(answer != undefined && answer != null && answer != ""){
                this.subject =  answer;
                this.getText(issuer , receiver);
                return;   
            }
            console.log("\n");
            console.log("Assunto inválido");
            console.log("\n");
            this.getSubject(issuer , receiver);
            return;
        });
    }

    private async getText(issuer: UserModel , receiver: UserModel){
        if(this.messageFoaas) {
            this.text = await this.requests.ApiFoaas(issuer, receiver);
            this.sendMessage(issuer , receiver);
            return;
        }
        ready.question("Informe o texto da mensagem:  ", (answer) => {
            console.log("\n");
            if(answer != undefined && answer != null && answer != ""){
                this.text =  answer;
                this.sendMessage(issuer , receiver);
                return;
            }
            console.log("\n");
            console.log("Texto inválido");
            console.log("\n");
            this.getText(issuer , receiver);
            return;
        });
    }

    private sendMessage(issuer: UserModel , receiver: UserModel){
        const message : TMessage = {
            subject: this.subject,
            message: this.text
        }
        if(this.messageServices.createMessage(issuer, receiver, message)){
            console.log("Mensagem enviada")
            console.log("\n");
        }else{
            console.log("Erro ao enviar Mensagem");
            console.log("\n");
        } 
        initializeApp();
        return;
    }
}