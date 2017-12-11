/**
 * Created by vroub on 07/12/2017.
 */
export class User {

  id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;

  constructor(data) {
    if (data) {
      this.id = data.id;
      this.username = data.username;
      this.firstName = data.firstName;
      this.lastName = data.lastName
    }
  }
}
