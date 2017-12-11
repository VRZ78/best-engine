import {Component, OnInit} from '@angular/core';
import {APIService} from "../../shared/services/APIService.service";
import {User} from "../../shared/models/User.model";
import {NavController, ToastController} from "ionic-angular";
import {TabsPage} from "../tabs/tabs";

@Component({
  templateUrl: 'login.html'
})
export class LoginPage implements OnInit{

  user: User;
  registerUser: User;

  constructor(private APISerive : APIService, public navCtrl: NavController, public toastCtrl: ToastController) {

  }

  ngOnInit(): void {
    this.user = new User({});
    this.registerUser = new User({});
  }

  login = function () {
    this.APISerive.connect(this.user.username, this.user.password).then(() => {
      this.navCtrl.push(TabsPage);
    }, (err) => {
      let toast = this.toastCtrl.create({
        message: 'Utilisateur inconnu',
        duration: 3000
      });
      toast.present();
    })
  };

  register = function () {
    this.APISerive.register(this.registerUser).then(() => {
      let toast = this.toastCtrl.create({
        message: 'Inscription réussie',
        duration: 3000
      });
      toast.present();
    }, (err) =>{
      let toast = this.toastCtrl.create({
        message: "L'inscription a échouée",
        duration: 3000
      });
      toast.present();
    })
  };

}
