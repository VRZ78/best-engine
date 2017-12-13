import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user/user.model";
/**
 * Created by vroub on 07/12/2017.
 */

@Injectable()

export class APIService {

  uri = "http://192.168.43.136:5000/";
  token : String;

  constructor(private http: HttpClient) {
  };


  connect = function (username, password) {
    return new Promise((resolve, reject) => {
      this.http.post(this.uri + "user/connection", {username : username, password : password}).subscribe((data) => {
        this.token = data.token;
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
  createOrder = function (userId: String, order: any[]) {
    return new Promise((resolve, reject) => {
      this.http.post(this.uri + "order?userId=" +   userId, order).subscribe((data) => {
        resolve(data);
      }, (err) => {
        reject(err);
      })
    });
  }


}
