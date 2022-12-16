import axios from 'axios';
import { UserModel } from '../model/UserModel';
import { endPoints } from './endpoint/endPoints';

export class Requests{

    public async ApiFoaas(issuer: UserModel , receiver: UserModel) {
        const random = Math.floor(Math.random() * 5 );
        const endPoint = endPoints(random, receiver.getName(), issuer.getName());
        const url = `https://foass.1001010.com${endPoint}`;
        const message:string =  await axios.get(url).then(response => response.data.message);
        return message;
    }
}