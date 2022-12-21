import axios from 'axios';
import { endPoints } from './endpoint/endPoints';
import { UserType } from '../types/UserType';

export class Requests {

    public async ApiFoaas(sender: UserType , receiver: UserType) : Promise<string> {
        const random = Math.floor(Math.random() * 5 );
        const endPoint = endPoints(random, sender.name, receiver.name);
        const url = `https://foass.1001010.com${endPoint}`;
        return await axios.get(url).then(response => response.data.message).then(data => data);
    }
}