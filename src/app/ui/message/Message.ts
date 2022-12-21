import { initializeApp, ready } from '../../..';
import { MessageServices } from '../../message/services/MessageServices';
import { TMessage } from '../../types/TMessage';
import { Requests } from '../../requests/requests';
import { UserType } from '../../types/UserType';

export class Message {
    private messageServices: MessageServices;
    private requests: Requests;
    private subject = "";
    private text = "";
    private messageFoaas = false;

    constructor() {
        this.messageServices = new MessageServices();
        this.requests = new Requests();
    }

    public create(sender: UserType , receiver: UserType) {
        this.typeMessage(sender , receiver);
        return;
    }

    public get(user: UserType) {
        this.getUserMessages(user);
        return;
    }
    
    private getUserMessages(user: UserType) {
        const {messageSender , messageReceiver} = this.messageServices.getMessage(user);
        console.log("\n");
        if(messageSender.length != 0 || messageReceiver.length != 0) {
            if(messageSender.length > 0 ){
                console.log(
                    `Mensagens enviadas por ${user.name}, Código ${user.code} \n`);
                messageSender.forEach(message => {
                    if(user.code == message.sender.code) {
                        console.log(
                            `Para -> Usuário: ${message.receiver.name}, Código: ${message.receiver.code} `);
                        console.log(`Assunto: ${message.message.subject}`);
                        console.log(`Mensagem: ${message.message.message} \n`);
                    }
                });
            }
             if(messageReceiver.length > 0 ) {

                console.log(
                    `Mensagens recebidas por ${user.name}, Código ${user.code} \n`);
                messageReceiver.forEach(message => {
                    if(user.code== message.receiver.code) {
                        console.log(
                            `De -> Usuário: ${message.sender.name}, Código: ${message.sender.code} `);
                        console.log(`Assunto: ${message.message.subject}`);
                        console.log(`Mensagem: ${message.message.message} \n`);
                    }
                });
            }
        }else {
            console.log("Usuário não enviou e nem recebeu mensagens \n");
        }
        initializeApp();
        return;
    }

    private typeMessage(sender: UserType , receiver: UserType) {
        ready.question("Deseja enviar uma mensagem apimentada?: \n 1- SIM \n 2- NÃO \n -> ", 
        (answer) => {
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



    private getSubject(sender: UserType , receiver: UserType) {
     ready.question("Informe o assunto da Mensagem:  ", (answer) => {
            console.log("\n");
            if(answer != undefined && answer != null && answer != "") {
                this.subject =  answer;
                this.getText(sender , receiver);
                return;   
            }
            console.log("Assunto inválido \n");
            this.getSubject(sender , receiver);
            return;
        });
    }

    private async getText(sender: UserType , receiver: UserType) {
        if(this.messageFoaas) {
            this.text = await this.requests.ApiFoaas(sender, receiver);
            this.sendMessage(sender , receiver);
            return;
        }
        ready.question("Informe o texto da mensagem:  ", (answer) => {
            console.log("\n");
            if(answer != undefined && answer != null && answer != "") {
                this.text =  answer;
                this.sendMessage(sender , receiver);
                return;
            }
            console.log("Texto inválido \n");
            this.getText(sender , receiver);
            return;
        });
    }

    private sendMessage(sender: UserType , receiver: UserType) {
        const message : TMessage = {
            subject: this.subject,
            message: this.text
        }
        if(this.messageServices.createMessage(sender, receiver, message)) {
            console.log("Mensagem enviada \n")
        }else{
            console.log("Erro ao enviar Mensagem \n");
        } 
        initializeApp();
        return;
    }
}