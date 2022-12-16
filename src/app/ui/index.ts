import { ready } from "../..";
import { User } from "./user/user";

export class Index {
    private user: User;
    
    constructor(){
        this.user = new User();
    }

    
    public App(){
        ready.question(" 1 - Cadastrar Usuário \n 2 - Enviar Mensagem \n 3 - Ver histórico de mensagens \n 4 - Sair \n ->  "
                        , (answer) => {
                            switch(answer){
                                case "1": 
                                    console.log("\n");
                                    this.user.createUser();
                                    break;
                                case "2": 
                                    console.log("\n");
                                    this.user.createMessage();
                                    break;
                                case "3": 
                                    console.log("\n");
                                    this.user.getUserMessages();
                                    break;
                                case "4":
                                    console.log("Encerrada");
                                    break;
                                default:
                                    console.log("\n"); 
                                    console.log("Opção inválida");
                                    console.log("\n");
                                    this.App();
                                    break;
                            }
                        });
    };
}