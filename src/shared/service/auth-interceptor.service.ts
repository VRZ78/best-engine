import {Injectable, Injector} from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import {LoginPage} from "../../pages/login/login";
import {App, ToastController} from "ionic-angular";
import {APIService} from "./APIService.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector)  // Workaround, can't inject loginService.
  // Will be fixed in angular 5.3. Fix here then
  {

  }

  /**
   * intercepth every Http Request and oinject the auth token
   * @param {HttpRequest<any>} req
   * @param {HttpHandler} next
   * @returns {Observable<HttpEvent<any>>}
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let apiService = this.injector.get(APIService);
    if (apiService.token) {
      const changedReq = req.clone({headers: req.headers.set('Authorization', apiService.token.toString())});
      return next.handle(changedReq).catch((err: HttpErrorResponse) => {
        // Disconnect user on all 401 events
        if (err.status === 401) {
          let app = this.injector.get(App);
          app.getRootNav().setRoot(LoginPage);
        } else {
          return Observable.throw(err);
        }
      });
    } else {
      return next.handle(req);
    }
  }
}
