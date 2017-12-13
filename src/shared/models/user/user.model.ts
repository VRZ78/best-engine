export class User {

  id: String;
  username: String;
  password: String;
  firstName: String;
  lastName: String;

  constructor(data) {
    if (data) {
      this.id = data._id;
      this.username = data.username;
      this.firstName = data.firstName;
      this.lastName = data.lastName
    }
  }
}
