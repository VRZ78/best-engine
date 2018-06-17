import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user/user.model";
import {Part} from "../models/part.model";
/**
 * Created by vroub on 07/12/2017.
 */

@Injectable()

export class APIService {

  uri = "http://localhost:5000/";
  currentUser : User;
  token : String;

  constructor(private http: HttpClient) {
  };


  connect (username, password) {
    return new Promise((resolve, reject) => {
      this.http.post(this.uri + "user/connection", {username : username, password : password}).subscribe((data : any) => {
        this.token = data.token;
        this.currentUser = new User(data)
        resolve(data);
      }, (err) => {
        reject(err);
      })
    });
  };

  /**
   * Inscrit un utilisateur
   * @param user
   * @returns {Promise<T>}
   */
  register = function (user : User) {
    return new Promise((resolve, reject) => {
      this.http.post(this.uri + "user", user).subscribe((data) => {
        resolve(data);
      }, (err) => {
        reject(err);
      })
    });
  }

  /**
   * Return the order for a user ID
   * @param {String} userId
   * @returns {Promise<any>}
   */
  getOrders = function(userId : String) {
    return new Promise((resolve, reject) => {
      this.http.get(this.uri + "order?userId=" +   userId).subscribe((data) => {
        resolve(data);
      }, (err) => {
        reject(err);
      })
    });
  }

  /**
   * Create an order from the diagnostic file
   * @param {String} userId
   * @param {any[]} order
   */
  createOrder (userId: String, order: any[]) {
    return new Promise((resolve, reject) => {
      this.http.post(this.uri + "order", order).subscribe((data) => {
        resolve(data);
      }, (err) => {
        reject(err);
      })
    });
  }

  changeOrderStatus (orderId: String, status: String) {
    return new Promise((resolve, reject) => {
      this.http.post(this.uri + "order/" + orderId + "/status", status).subscribe((data) => {
        resolve(data);
      }, (err) => {
        reject(err);
      })
    });
  }

  getCertificatesForOrder (order: any[]) {
    return new Promise((resolve, reject) => {
      this.http.post(this.uri + "order/certificates", order).subscribe((data : Array<any>) => {
        for(let part of data) {
          part = new Part(part)
        }
        resolve(data);
      }, (err) => {
        reject(err);
      })
    });
  }

}
