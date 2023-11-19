import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NavController, AlertController } from '@ionic/angular';
import { ServicioRegistroService } from '../servicios/servicio-registro.service';
import { RegistroModel } from '../model/registro-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  // Inicio del formulario
  formularioLogin: FormGroup;

  // Constructor con distintas llamadas a elementos que permiten el uso de formularios
  // Y controles de navegación
  constructor(public fb : FormBuilder, public navCtrl : NavController, public alertCtrl : AlertController, private servicioRegistroService: ServicioRegistroService) {
    // Asignación de elementos al formulario incluyendo validadores
    this.formularioLogin = this.fb.group({
      'nombre': new FormControl("",Validators.required),
      'password': new FormControl("",Validators.required)
    })
  }

  ngOnInit() {}

  // Método que permite ingresar al home, validando al usuario
  async ingresar(){
    // Variable que utiliza los valores en el formulario
    const formulario = this.formularioLogin.value;

    // Llama al servicio de registro para obtener la lista de usuarios
    this.servicioRegistroService.getLogins().subscribe((usuarios: RegistroModel[]) => {
      // Busca el usuario ingresado en el formulario dentro de la lista de usuarios
      const usuarioValido = usuarios.find(u => u.nombre === formulario.nombre && u.contrasena === formulario.password);

      if (usuarioValido) {
        // Asigna una variable en el localstorage para indicar que el usuario inició sesión
        localStorage.setItem("ingresado","true");

        // Redirige al usuario a la página de inicio
        this.navCtrl.navigateRoot('home');
      } else {
        // Si no es válido el usuario, lanza una alerta
        this.mostrarAlerta();
      }
    });
  }

  // Método para mostrar una alerta si los datos de inicio de sesión no son válidos
  async mostrarAlerta() {
    const alerta = await this.alertCtrl.create({
      header: 'Datos incorrectos',
      message: 'Los datos ingresados no son correctos',
      buttons: ['Aceptar']
    });

    await alerta.present();
  }
}
