import {Component, OnInit} from '@angular/core';
import {NavController, ToastController} from "ionic-angular";
import {User} from "../../shared/models/user.model";
import {APIService} from "../../shared/service/APIService.service";
import {HomePage} from "../home/home";
import {UserService} from "../../shared/service/user.service";

@Component({
  templateUrl: 'login.html'
})
export class LoginPage implements OnInit{

  user: User;

  constructor(private APISerive : APIService, public navCtrl: NavController, public toastCtrl: ToastController, private userService : UserService) {

  }

  ngOnInit(): void {
    this.user = new User({});
  }

  login = function () {
    this.APISerive.connect(this.user.username, this.user.password).then((data) => {
      this.userService.user = data;
      this.navCtrl.push(HomePage);
    }, (err) => {
      let toast = this.toastCtrl.create({
        message: 'Utilisateur inconnu',
        duration: 3000
      });
      toast.present();
    })
  };


}
