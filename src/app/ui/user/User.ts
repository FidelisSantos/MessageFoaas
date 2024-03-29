import { initializeApp, ready } from '../../../index';
import { UserType } from '../../types/UserType';
import { UserService } from '../../user/services/UserService';
import { TranspotService } from '../../dto/UserToMessageDTO';

export class User {
  private name = '';
  private code = 0;
  private userServices: UserService;
  private transport : TranspotService;

  constructor() {
    this.userServices = new UserService();
    this.transport = new TranspotService();
  }

  public getSenderAndReceiver() {
    this.getSender();
  }

  public create() {
    this.getName();
  }

  public get() {
    this.searchUser();
  }

  private searchUser() {
    const users = this.userServices.getAll();
    users.forEach((user) => console.log(`Código: ${user.code} Nome: ${user.name}`));
    ready.question('Digite o código do usuário que quer ver o histórico: ', (answer) => {
      console.log('\n');
      if (answer != '' || answer != null || answer != undefined) {
        const user = users.find((user) => user.code == +answer);
        if (user) {
          this.transport.transportUser(user);
          return;
        }
        else 
          console.log(`Código ${+answer} não encontrado \n`);
        
      } else 
          console.log(`Favor informar um código \n`);
      
      initializeApp();
    });
  }

  private getName() {
    ready.question('Digite um nome: ', (answer) => {
      console.log('\n');
      if (answer.length) {
        this.name = answer;
        this.getCode();
        return;
      } 
        console.log('Nome inválido \n');
        initializeApp();
      
    });
  }

  private getCode() {
    ready.question('Digite um código: ', (answer) => {
      console.log('\n');
      if (answer.length) {
        this.code = +answer;
        const newUser: UserType = {
          name: this.name,
          code: this.code
        };
        if (this.userServices.create(newUser)) 
            console.log('Usuário criado \n');
         else 
            console.log('Código informado já está sendo utilizado \n');
        
      } else 
          console.log('Código não pode ser vazio \n');
      
      initializeApp();
    });
  }

  private getSender() {
    console.log('\n');
    const users = this.userServices.getAll();
    if (users.length <= 1) {
      console.log('Favor cadastrar no minimo 2 usuários \n');
      initializeApp();
      return;
    }
    let userSender: UserType;
    users.forEach((user) => console.log(`Código: ${user.code} Nome: ${user.name}`));
    ready.question('Digite o código do usuário que enviará a mensagem: ', (answer) => {
      const user = users.find((user) => user.code == +answer);
      if (user) {
        userSender = user;
        this.getReceiver(users, userSender);
        return;
      }
      console.log(`Código: ${+answer} não encontrado\n`);
      initializeApp();
    });
  }

  private getReceiver(users: UserType[], sender: UserType) {
    let userReceiver: UserType;
    users.forEach((user) => {
      if (user.code != sender.code) console.log(`Código: ${user.code} Nome: ${user.name}`);
    });
    ready.question('Digite o código do usuário que receberá a mensagem: ', (answer) => {
      console.log('\n');
      if (+answer == sender.code) {
        console.log('Usuário não pode mandar mensagem para ele mesmo');
        this.getReceiver(users, sender);
        return;
      }
      const user = users.find((user) => user.code == +answer);
      if (user) {
        userReceiver = user;
        this.transport.transportSenderAndReceiver(sender, userReceiver);
        return;
      }
      console.log(`Código: ${+answer} não encontrado \n`);
      initializeApp();
    });
  }
}
