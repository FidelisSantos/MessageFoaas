import { UserModel } from "../../model/UserModel";
import { userRepository } from "../repository/userRepository";

export class userServices{
    private repository: userRepository

    constructor(){
        this.repository = new userRepository();
    }


    public createUser(newUser : UserModel) {
        if(!this.repository.userExists(newUser)) return false;
        this.repository.createUser(newUser);
        return true;
    }

    public getUsers(){
        return this.repository.getUsers();
    }
}