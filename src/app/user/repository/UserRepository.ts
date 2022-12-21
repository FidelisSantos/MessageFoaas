import { UserType } from '../../types/UserType';

export class UserRepository {
  private userList: Array<UserType> = [];

  public createUser(newUser: UserType) {
    this.userList.push(newUser);
  }

  public getUsers() {
    return this.userList;
  }

  public userExists(newUser: UserType) {
    const isValid = this.userList.find((user) => user.code == newUser.code);
    if (isValid == undefined) return true;
    return false;
  }
}
