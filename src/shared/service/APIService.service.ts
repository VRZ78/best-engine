import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {User} from "../models/User.model";
/**
 * Created by vroub on 07/12/2017.
 */

@Injectable()

export class APIService {

  uri = "http://localhost:5000/";

  constructor(private http: HttpClient) {
  };


  connect = function (username, password) {
    return new Promise((resolve, reject) => {
      this.http.post(this.uri + "user/connection", {username : username, password : password}).subscribe((data) => {
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

}
