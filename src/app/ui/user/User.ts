
import { initializeApp, ready } from '../../../index';
import { UserModel } from '../../model/UserModel';
import { UserServices } from '../../user/services/UserServices';
import { Message } from '../message/Message';

export class User {
    private name  = "";
    private code  = 0;
    private userServices: UserServices;
    private message : Message;

    constructor(){
        this.userServices = new UserServices();
        this.message = new Message();
    }

    public createMessage(){
        this.getUsersender();
        return;
    }
    
    public createUser(){
        this.getName();
        return;
    }

    public getUserMessages(){
        this.getUser();
        return;
    }
    

    private getUser(){
        const users = this.userServices.getUsers();
        users.forEach(user => 
            console.log(`Código: ${user.getCode()} Nome: ${user.getName()}`)
            );
        ready.question("Digite o código do usuário que quer ver o histórico: ", (answer) =>{
            console.log("\n");
            if(answer != "" || answer != null || answer != undefined){
                const findUser = users.find(user => user.getCode() == +answer);
                if(findUser != undefined){
                    this.message.getMessage(findUser);
                    return;
                }else{
                    console.log(`Código ${+answer} não encontrado \n"`);
                    initializeApp();
                    return;
                }
            }else{
                console.log(`Favor Informar um código \n`);
                initializeApp();
                return;
            }
        })
    }



    private getName(){
        ready.question("Digite um nome: ", (answer) =>{
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

    private getCode(){
        ready.question("Digite um código: ", (answer) =>{
            console.log("\n");
            if(answer.length > 0){
                this.code = +answer;
                const newUser = new UserModel(this.name, this.code);
                if (this.userServices.createUser(newUser)){
                    console.log("Usuário criado \n")
                }else{
                    console.log("código informado já está sendo utilizado \n");
                }  
                initializeApp();
                return;
            }else{
                console.log("código não pode ser vazio \n");
                initializeApp();
                return;
            }
        });
    }



    private getUsersender(){
        console.log("\n");
        const users = this.userServices.getUsers();
        if(users.length <= 1) {
            console.log("Favor cadastrar no minimo 2 usuários");
            console.log("\n");
            initializeApp();
            return;
        }
        let usersender: UserModel;
        users.forEach(user => 
            console.log(`Código: ${user.getCode()} Nome: ${user.getName()}`));
        ready.question("Digite o código do usuário que enviará a mensagem: ", (answer) =>{
            const findUser = users.find(user => user.getCode() == +answer);
            if (findUser != undefined){
                usersender =  findUser;
                this.getUserReceiver(users, usersender);
                return;
            }
            console.log(`Código: ${+answer} não encontrado`);
            console.log("\n");
            initializeApp();
            return;
        });
    }

    private getUserReceiver(users: UserModel[], sender: UserModel){
        if(users.length == 0) {
            console.log("Favor cadastrar mais um usuário para conseguir enviar a mensagem");
            initializeApp();
            return;
        }
        let userReceiver: UserModel;
        users.forEach(user =>{ 
            if(user.getCode() != sender.getCode())
                console.log(`Código: ${user.getCode()} Nome: ${user.getName()}`)
            }
           );
        ready.question("Digite o código do usuário que receberá a mensagem: ", (answer) =>{
            console.log("\n");
            if(+answer == sender.getCode()){
                console.log("Usuário não pode mandar mensagem para ele mesmo");
                this.getUserReceiver(users, sender);
                return;
            }
            const findUser = users.find(user => user.getCode() == +answer);
            if(findUser != undefined){
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