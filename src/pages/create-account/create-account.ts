import {Component, OnInit} from '@angular/core';
import {NavController, ToastController} from "ionic-angular";
import {User} from "../../shared/models/user/user.model";
import {APIService} from "../../shared/service/APIService.service";
import {HomePage} from "../home/home";
import {UserService} from "../../shared/service/user.service";
import {LoginPage} from "../login/login";

@Component({
  templateUrl: 'create-account.html',
  providers:[]
})

export class CreateAccountPage implements OnInit{

  user: User;
  test : any;
  constructor(private APISerive : APIService, public navCtrl: NavController, public toastCtrl: ToastController, private userService : UserService) {

  }

  ngOnInit(): void {
    this.user = new User({type : "airclub"});
  }

  create  () {
    this.APISerive.register(this.user).then((data:any) => {
      this.userService.user = data;
      this.navCtrl.pop();
    }, (err) => {
      let toast = this.toastCtrl.create({
        message: 'Impossible de créer le compte',
        duration: 3000
      });
      toast.present();
    })
  };


}
