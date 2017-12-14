/**
 * Created by vroub on 07/12/2017.
 */
export class Order {

  id : String;
  products : [String];
  status: String;
  date : String;
  userId : String;
  isGarage : Boolean;

  constructor(data) {
    if (data) {
      this.id = data._id;
      this.products = data.products;
      this.status = data.status;
      this.date = data.date;
      this.userId = data.userId
      this.isGarage = data.isGarage;
    }
  }
}
