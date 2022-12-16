
import { initializeApp, ready } from '../../../index';
import { UserModel } from '../../model/UserModel';
import { userServices } from '../../user/services/userServices';
import { Message } from '../message/message';

export class User {
    private name : string = "";
    private code : number = 0;
    private userServices: userServices;
    private message : Message;

    constructor(){
        this.userServices = new userServices();
        this.message = new Message();
    }

    public createMessage(){
        this.getUserIssuer();
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
        let users = this.userServices.getUsers();
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
                    console.log(`Código ${+answer} não encontrado`);
                    console.log("\n");
                    initializeApp();
                    return;
                }
            }else{
                console.log(`Favor Informar um código`);
                console.log("\n");
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
                console.log("Nome inválido");
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
                    console.log("Usuário criado")
                    console.log("\n");
                }else{
                    console.log("código informado já está sendo utilizado");
                    console.log("\n");
                }  
                initializeApp();
                return;
            }else{
                console.log("código não pode ser vazio");
                console.log("\n");
                initializeApp();
                return;
            }
        });
    }



    private getUserIssuer(){
        console.log("\n");
        let users = this.userServices.getUsers();
        if(users.length == 0) {
            console.log("Favor cadastrar no minimo 2 usuários");
            console.log("\n");
            initializeApp();
            return;
        }
        let userIssuer: UserModel;
        users.forEach(user => 
            console.log(`Código: ${user.getCode()} Nome: ${user.getName()}`));
        ready.question("Digite o código do usuário que enviará a mensagem: ", (answer) =>{
            const findUser = users.find(user => user.getCode() == +answer);
            if (findUser != undefined){
                userIssuer =  findUser;
                this.getUserReceiver(users, userIssuer);
                return;
            }
            console.log(`Código: ${+answer} não encontrado`);
            console.log("\n");
            initializeApp();
            return;
        });
    }

    private getUserReceiver(users: UserModel[], issuer: UserModel){
        if(users.length == 0) {
            console.log("Favor cadastrar mais um usuário para conseguir enviar a mensagem");
            initializeApp();
            return;
        }
        let userReceiver: UserModel;
        users.forEach(user =>{ 
            if(user.getCode() != issuer.getCode())
                console.log(`Código: ${user.getCode()} Nome: ${user.getName()}`)
            }
           );
        ready.question("Digite o código do usuário que receberá a mensagem: ", (answer) =>{
            console.log("\n");
            if(+answer == issuer.getCode()){
                console.log("Usuário não pode mandar mensagem para ele mesmo");
                this.getUserReceiver(users, issuer);
                return;
            }
            const findUser = users.find(user => user.getCode() == +answer);
            if(findUser != undefined){
                userReceiver =  findUser;
                this.message.createMessage(issuer, userReceiver);
                return;
            }
            console.log(`Código: ${+answer} não encontrado`);
            console.log("\n");
            initializeApp();
            return;
        });
    }
}
