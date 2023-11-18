import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public navCtrl: NavController) {}
  
  //Variable utilizada para mostrar la alerta y su opción
  public alertButtons = ['OK'];

  //Función llamada desde el HTML, que permite cambiar el estado de ingresado
  //Para que el usuario deba loguearse nuevamente devolviendose también
  //al login
  salir(){
    //Cambia el estado "ingresado" de localstorage a "false"
    localStorage.setItem("ingresado","false");
    //redirige la aplicación a "login"
    this.navCtrl.navigateRoot("login");
  }

}
