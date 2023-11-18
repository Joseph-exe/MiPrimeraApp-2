import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {

  constructor(public navCtrl: NavController){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //Regla que valida que el dato ingresado en localstorage esté en true
    //Y si es así, puede ver el home
    if (localStorage.getItem('ingresado') == 'true')
    {
      //Si está ingresado, permite el acceso
      return true;
    }
    else
    {
      //Si no es true, se devuelve al login
      this.navCtrl.navigateRoot("login");
      return false;
    }

    //return true;
  }
  
}
