import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NavController, AlertController } from '@ionic/angular';
import { ServicioRegistroService } from '../servicios/servicio-registro.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup;

  constructor(
    public fb: FormBuilder,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    private servicioRegistroService: ServicioRegistroService
  ) {
    this.formularioLogin = this.fb.group({
      'nombre': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required)
    });
  }

  ngOnInit() {}

  async ingresar() {
    const formulario = this.formularioLogin.value;

    // Utiliza el nuevo método autenticar del servicio
    this.servicioRegistroService.autenticar(formulario).subscribe(
      (response) => {
        if (response.success) {
          localStorage.setItem("ingresado", "true");
          this.navCtrl.navigateRoot('home');
        } else {
          this.mostrarAlerta();
        }
      },
      (error) => {
        console.error('Error de autenticación:', error);
        this.mostrarAlerta();
      }
    );
  }

  async mostrarAlerta() {
    const alerta = await this.alertCtrl.create({
      header: 'Datos incorrectos',
      message: 'Los datos ingresados no son correctos',
      buttons: ['Aceptar']
    });

    await alerta.present();
  }
}
