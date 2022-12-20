
import { initializeApp, ready } from '../../../index';
import { ListUser } from '../../types/ListUser';
import { UserServices } from '../../user/services/UserServices';
import { Message } from '../message/Message';

export class User {
    private name  = "";
    private code  = 0;
    private userServices: UserServices;
    private message : Message;

    constructor() {
        this.userServices = new UserServices();
        this.message = new Message();
    }

    public createMessage() {
        this.getUsersender();
        return;
    }
    
    public createUser() {
        this.getName();
        return;
    }

    public getUserMessages() {
        this.getUser();
        return;
    }
    

    private getUser() {
        const users = this.userServices.getUsers();
        users.forEach(user => 
            console.log(`Código: ${user.code} Nome: ${user.name}`)
            );
        ready.question("Digite o código do usuário que quer ver o histórico: ", (answer) => {
            console.log("\n");
            if(answer != "" || answer != null || answer != undefined) {
                const findUser = users.find(user => user.code == +answer);
                if(findUser != undefined) {
                    this.message.getMessage(findUser);
                    return;
                }else {
                    console.log(`Código ${+answer} não encontrado \n"`);
                    initializeApp();
                    return;
                }
            }else {
                console.log(`Favor informar um código \n`);
                initializeApp();
                return;
            }
        })
    }



    private getName() {
        ready.question("Digite um nome: ", (answer) => {
            console.log("\n");
            if(answer.length > 0){
                this.name = answer;
                this.getCode();
                return;
            }else {
                console.log("Nome inválido \n");
                initializeApp();
                return;
            }
        });
    }

    private getCode() {
        ready.question("Digite um código: ", (answer) => {
            console.log("\n");
            if(answer.length > 0){
                this.code = +answer;
                const newUser : ListUser =  {
                    name : this.name, 
                    code : this.code};
                if (this.userServices.createUser(newUser)) {
                    console.log("Usuário criado \n")
                }else {
                    console.log("Código informado já está sendo utilizado \n");
                }  
                initializeApp();
                return;
            }else {
                console.log("Código não pode ser vazio \n");
                initializeApp();
                return;
            }
        });
    }



    private getUsersender() {
        console.log("\n");
        const users = this.userServices.getUsers();
        if(users.length <= 1) {
            console.log("Favor cadastrar no minimo 2 usuários");
            console.log("\n");
            initializeApp();
            return;
        }
        let userSender: ListUser;
        users.forEach(user => 
            console.log(`Código: ${user.code} Nome: ${user.name}`));
        ready.question("Digite o código do usuário que enviará a mensagem: ", (answer) => {
            const findUser = users.find(user => user.code == +answer);
            if (findUser != undefined) {
                userSender =  findUser;
                this.getUserReceiver(users, userSender);
                return;
            }
            console.log(`Código: ${+answer} não encontrado`);
            console.log("\n");
            initializeApp();
            return;
        });
    }

    private getUserReceiver(users: ListUser[], sender: ListUser) {
        let userReceiver: ListUser;
        users.forEach(user => { 
            if(user.code != sender.code)
                console.log(`Código: ${user.code} Nome: ${user.name}`)
            }
           );
        ready.question("Digite o código do usuário que receberá a mensagem: ", (answer) => {
            console.log("\n");
            if(+answer == sender.code) {
                console.log("Usuário não pode mandar mensagem para ele mesmo");
                this.getUserReceiver(users, sender);
                return;
            }
            const findUser = users.find(user => user.code == +answer);
            if(findUser != undefined) {
                userReceiver =  findUser;
                this.message.createMessage(sender, userReceiver);
                return;
            }
            console.log(`Código: ${+answer} não encontrado`);
            console.log("\n");
            initializeApp();
            return;
        });
    }
}
