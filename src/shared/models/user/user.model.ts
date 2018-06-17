export class User {

  id: String;
  username: String;
  password: String;
  firstName: String;
  lastName: String;
  type : String;
  role : String;

  constructor(data) {
    if (data) {
      this.id = data._id;
      this.username = data.username;
      this.firstName = data.firstName;
      this.lastName = data.lastName
      this.type = data.type;
      this.role = data.role;
    }
  }
}
