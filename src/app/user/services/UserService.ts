import { UserType } from '../../types/UserType';
import { UserRepository } from '../repository/UserRepository';

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public create(newUser: UserType) {
    if (!this.userRepository.userExists(newUser)) return false;
    this.userRepository.create(newUser);
    return true;
  }

  public getAll() {
    return this.userRepository.getAll();
  }
}
