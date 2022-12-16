import { UserModel } from '../../model/UserModel';


export class userRepository {

    private userList :Array<UserModel> = [];

    public createUser(newUser : UserModel) {
        if(!this.userExists(newUser)) return false;
        this.userList.push(newUser);
    }

    public getUsers(){
        return this.userList;
    }

    public userExists(newUser : UserModel){
        let isValid = this.userList.find(user => user.getCode() == newUser.getCode());
        if (isValid == undefined)  return true;
        return false;    
    }
}