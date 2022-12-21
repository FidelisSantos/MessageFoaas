import { UserType } from "../../types/UserType";
import { UserRepository } from '../repository/UserRepository';


export class UserServices {
    private userRepository: UserRepository

    constructor() {
        this.userRepository = new UserRepository();
    }


    public createUser(newUser : UserType) {
        if(!this.userRepository.userExists(newUser)) return false;
        this.userRepository.createUser(newUser);
        return true;
    }

    public getUsers() {
        return this.userRepository.getUsers();
    }
}