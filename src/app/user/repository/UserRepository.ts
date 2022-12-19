import { UserModel } from '../../model/UserModel';


export class UserRepository {

    private userList :Array<UserModel> = [];

    public createUser(newUser : UserModel) {
        if(!this.userExists(newUser)) return false;
        this.userList.push(newUser);
    }

    public getUsers(){
        return this.userList;
    }

    public userExists(newUser : UserModel){
        const isValid = this.userList.find(user => user.getCode() == newUser.getCode());
        if (isValid == undefined)  return true;
        return false;    
    }
}