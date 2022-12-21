import { initializeApp, ready } from '../../../index';
import { UserType } from '../../types/UserType';
import { UserServices } from '../../user/services/UserServices';
import { UserToMessageDTO } from '../../dto/UserToMessageDTO';

export class User {
  private name = '';
  private code = 0;
  private userServices: UserServices;
  private userMessageDTO: UserToMessageDTO;

  constructor() {
    this.userServices = new UserServices();
    this.userMessageDTO = new UserToMessageDTO();
  }

  public getSenderAndReceiver() {
    this.getSender();
    return;
  }

  public createUser() {
    this.getName();
    return;
  }

  public getUser() {
    this.searchUser();
    return;
  }

  private searchUser() {
    const users = this.userServices.getUsers();
    users.forEach((user) =>
      console.log(`Código: ${user.code} Nome: ${user.name}`)
    );
    ready.question(
      'Digite o código do usuário que quer ver o histórico: ',
      (answer) => {
        console.log('\n');
        if (answer != '' || answer != null || answer != undefined) {
          const findUser = users.find((user) => user.code == +answer);
          if (findUser != undefined) {
            this.userMessageDTO.getMessage(findUser);
            return;
          } else {
            console.log(`Código ${+answer} não encontrado \n"`);
            initializeApp();
            return;
          }
        } else {
          console.log(`Favor informar um código \n`);
          initializeApp();
          return;
        }
      }
    );
  }

  private getName() {
    ready.question('Digite um nome: ', (answer) => {
      console.log('\n');
      if (answer.length > 0) {
        this.name = answer;
        this.getCode();
        return;
      } else {
        console.log('Nome inválido \n');
        initializeApp();
        return;
      }
    });
  }

  private getCode() {
    ready.question('Digite um código: ', (answer) => {
      console.log('\n');
      if (answer.length > 0) {
        this.code = +answer;
        const newUser: UserType = {
          name: this.name,
          code: this.code
        };
        if (this.userServices.createUser(newUser)) {
          console.log('Usuário criado \n');
        } else {
          console.log('Código informado já está sendo utilizado \n');
        }
        initializeApp();
        return;
      } else {
        console.log('Código não pode ser vazio \n');
        initializeApp();
        return;
      }
    });
  }

  private getSender() {
    console.log('\n');
    const users = this.userServices.getUsers();
    if (users.length <= 1) {
      console.log('Favor cadastrar no minimo 2 usuários');
      console.log('\n');
      initializeApp();
      return;
    }
    let userSender: UserType;
    users.forEach((user) =>
      console.log(`Código: ${user.code} Nome: ${user.name}`)
    );
    ready.question(
      'Digite o código do usuário que enviará a mensagem: ',
      (answer) => {
        const findUser = users.find((user) => user.code == +answer);
        if (findUser != undefined) {
          userSender = findUser;
          this.getReceiver(users, userSender);
          return;
        }
        console.log(`Código: ${+answer} não encontrado`);
        console.log('\n');
        initializeApp();
        return;
      }
    );
  }

  private getReceiver(users: UserType[], sender: UserType) {
    let userReceiver: UserType;
    users.forEach((user) => {
      if (user.code != sender.code)
        console.log(`Código: ${user.code} Nome: ${user.name}`);
    });
    ready.question(
      'Digite o código do usuário que receberá a mensagem: ',
      (answer) => {
        console.log('\n');
        if (+answer == sender.code) {
          console.log('Usuário não pode mandar mensagem para ele mesmo');
          this.getReceiver(users, sender);
          return;
        }
        const findUser = users.find((user) => user.code == +answer);
        if (findUser != undefined) {
          userReceiver = findUser;
          this.userMessageDTO.createMessage(sender, userReceiver);
          return;
        }
        console.log(`Código: ${+answer} não encontrado`);
        console.log('\n');
        initializeApp();
        return;
      }
    );
  }
}
