import { ListUser } from '../../types/ListUser';


export class UserRepository {

    private userList :Array<ListUser> = [];

    public createUser(newUser : ListUser) {
        if(!this.userExists(newUser)) return false;
        this.userList.push(newUser);
    }

    public getUsers() {
        return this.userList;
    }

    public userExists(newUser : ListUser) {
        const isValid = this.userList.find(user => user.code== newUser.code);
        if (isValid == undefined)  return true;
        return false;    
    }
}