import { ready } from '../..';
import { User } from './user/User';

export class Index {
  private user: User;

  constructor() {
    this.user = new User();
  }

  public App() {
    ready.question(
      ' 1 - Cadastrar Usuário \n 2 - Enviar Mensagem \n 3 - Ver histórico de mensagens \n 4 - Sair \n ->  ',
      (answer) => {
        console.log('\n');
        switch (answer) {
          case '1':
            this.user.create();
            break;
          case '2':
            this.user.getSenderAndReceiver();
            break;
          case '3':
            this.user.get();
            break;
          case '4':
            console.log('Encerrada \n');
            break;
          default:
            console.log('Opção inválida \n');
            this.App();
            break;
        }
      }
    );
  }
}
