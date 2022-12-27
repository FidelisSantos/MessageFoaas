import { UserType } from '../../types/UserType';

export class UserRepository {
  private userList: Array<UserType> = [];

  public create(newUser: UserType) {
    this.userList.push(newUser);
  }

  public getAll() {
    return this.userList;
  }

  public userExists(newUser: UserType) {
    const isValid = this.userList.find((user) => user.code == newUser.code);
    if (!isValid) return true;
    return false;
  }
}
