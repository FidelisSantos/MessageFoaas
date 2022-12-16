import axios from 'axios';
import { UserModel } from '../model/UserModel';
import { endPoints } from './endpoint/endPoints';

export class Requests{

    public async ApiFoaas(sender: UserModel , receiver: UserModel) {
        const random = Math.floor(Math.random() * 5 );
        const endPoint = endPoints(random, sender.getName(), receiver.getName());
        const url = `https://foass.1001010.com${endPoint}`;
        const message:string =  await axios.get(url).then(response => response.data.message);
        return message;
    }
}