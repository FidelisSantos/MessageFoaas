import { UserModel } from "../../model/UserModel";
import { UserRepository } from '../repository/UserRepository';


export class UserServices {
    private userRepository: UserRepository

    constructor() {
        this.userRepository = new UserRepository();
    }


    public createUser(newUser : UserModel) {
        if(!this.userRepository.userExists(newUser)) return false;
        this.userRepository.createUser(newUser);
        return true;
    }

    public getUsers() {
        return this.userRepository.getUsers();
    }
}