import { initializeApp, ready } from '../../..';
import { MessageServices } from '../../message/services/MessageServices';
import { TMessage } from '../../types/TMessage';
import { Requests } from '../../requests/requests';
import { UserType } from '../../types/UserType';
import { MessageType } from '../../types/MessageType';

export class Message {
  private messageServices: MessageServices;
  private requests: Requests;
  private subject = '';
  private text = '';
  private messageFoaas = false;

  constructor() {
    this.messageServices = new MessageServices();
    this.requests = new Requests();
  }

  public create(sender: UserType, receiver: UserType) {
    this.typeMessage(sender, receiver);
  }

  public get(user: UserType) {
    this.getUserMessages(user);
  }

  private getUserMessages(user: UserType) {
    const { messageSender, messageReceiver } = this.messageServices.getMessage(user);
    console.log('\n');
    if (messageSender.length || messageReceiver.length) {
      this.printMessages(messageSender, messageReceiver, user);
    } else {
      console.log('Usuário não enviou e nem recebeu mensagens \n');
    }
    initializeApp();
  }

  private printMessages(messageSender: MessageType[], messageReceiver: MessageType[], user: UserType) {
    if (messageSender.length) {
      console.log(`Mensagens enviadas por ${user.name}, Código ${user.code} \n`);
      messageSender.forEach((message) => {
        if (user.code == message.sender.code) {
          console.log(`Destinatário -> ${message.receiver.name} Código: ${message.receiver.code} `);
          console.log(`Assunto -> ${message.message.subject}`);
          console.log(`Mensagem -> ${message.message.message} \n`);
        }
      });
    }
    if (messageReceiver.length) {
      console.log(`Mensagens recebidas por ${user.name}, Código ${user.code} \n`);
      messageReceiver.forEach((message) => {
        if (user.code == message.receiver.code) {
          console.log(`Remetente -> Usuário: ${message.sender.name} Código: ${message.sender.code} `);
          console.log(`Assunto -> ${message.message.subject}`);
          console.log(`Mensagem -> ${message.message.message} \n`);
        }
      });
    }
  }

  private typeMessage(sender: UserType, receiver: UserType) {
    ready.question('Deseja enviar uma mensagem apimentada?: \n 1- SIM \n 2- NÃO \n -> ', (answer) => {
      console.log('\n');
      switch (answer) {
        case '1':
          this.messageFoaas = true;
          this.getSubject(sender, receiver);
          break;
        case '2':
          this.messageFoaas = false;
          this.getSubject(sender, receiver);
          break;
        default:
          console.log('Opção inválida \n');
          this.typeMessage(sender, receiver);
          break;
      }
    });
  }

  private getSubject(sender: UserType, receiver: UserType) {
    ready.question('Informe o assunto da Mensagem:  ', (answer) => {
      console.log('\n');
      if (answer) {
        this.subject = answer;
        this.getText(sender, receiver);
        return;
      }
      console.log('Assunto inválido \n');
      this.getSubject(sender, receiver);
    });
  }

  private async getText(sender: UserType, receiver: UserType) {
    if (this.messageFoaas) {
      this.text = await this.requests.ApiFoaas(sender, receiver);
      this.sendMessage(sender, receiver);
      return;
    }
    ready.question('Informe o texto da mensagem:  ', (answer) => {
      console.log('\n');
      if (answer) {
        this.text = answer;
        this.sendMessage(sender, receiver);
        return;
      }
      console.log('Texto inválido \n');
      this.getText(sender, receiver);
    });
  }

  private sendMessage(sender: UserType, receiver: UserType) {
    const message: TMessage = {
      subject: this.subject,
      message: this.text
    };
    if (this.messageServices.createMessage(sender, receiver, message)) {
      console.log('Mensagem enviada \n');
      console.log(`Remetente ->${sender.name} Código ${sender.code}`);
      console.log(`Destinatário ->${receiver.name} Código ${receiver.code}`);
      console.log(`Assunto -> ${message.subject} `);
      console.log(`Mensagem -> ${message.message} \n`);
    } else {
      console.log('Erro ao enviar Mensagem \n');
    }
    initializeApp();
  }
}
