import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NavController, AlertController} from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  //Inicio del formulario
  formularioLogin: FormGroup;

  //Constructor con distintas llamadas a elementos que permiten el uso de formularios
  //Y controles de navegación
  constructor(public fb : FormBuilder, public navCtrl : NavController, public alertCtrl : AlertController) { 
    //Asignación de elementos al formulario incluyendo validadores
    this.formularioLogin = this.fb.group({
      'nombre': new FormControl("",Validators.required),
      'password': new FormControl("",Validators.required)
    })
  }

  ngOnInit() {
  }

  //Método que permite ingresar al home, validando al usuario
  async ingresar(){
    //Variable que utiliza los valores en el formulario
    var formulario = this.formularioLogin.value;
    //Variable que obtiene los valores almacenados en el localstorage
    var usuario = JSON.parse(localStorage.getItem('usuario')!);

    //Comparación entre lo ingresado y lo que está en localstorage
    if (usuario.nombre == formulario.nombre && usuario.password == formulario.password)
    {
      //Asignación de variable para determinar si el usuario inició sesión o no
      //utilizado en el localstorage y el guard
      localStorage.setItem("ingresado","true");
      //Redirección al home, ya que para estar aquí el usuario y la contraseña
      //debe ser válido
      this.navCtrl.navigateRoot('home');
    }
    else
    {
      //Si no es válido el usuario, lanza una alerta
      const alerta = await this.alertCtrl.create({
        header: 'Datos incorrectos',
        message: 'Los datos ingresados no son correctos',
        buttons: ['Aceptar']
      });

      await alerta.present();
    }
  }

}
