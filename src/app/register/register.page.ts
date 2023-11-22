import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { ServicioRegistroService } from '../servicios/servicio-registro.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  formularioRegistro: FormGroup;

  constructor(
    public formBuilder:FormBuilder, 
    public alertCtrl: AlertController, 
    public navCtrl: NavController,
    private registerService: ServicioRegistroService
  ) {
    this.formularioRegistro = this.formBuilder.group({
      'rut': new FormControl("",Validators.required),
      'telefono': new FormControl("",Validators.required),
      'telefono_emergencia': new FormControl("",Validators.required),
      'password': new FormControl("",Validators.required),
      'confirmar': new FormControl("",Validators.required)
    })
  }

  ngOnInit() {}

  async guardar() {
    var formulario = this.formularioRegistro.value;

    if (this.formularioRegistro.invalid){
      const alerta = await this.alertCtrl.create({
        header: "Datos incompletos",
        message: "Tienes que llenar todos los datos",
        buttons: ['Aceptar']
      });

      await alerta.present();
      return;
    }

    if (formulario.password != formulario.confirmar) {
      const alerta = await this.alertCtrl.create({
        header: "Error contraseñas",
        message: "Las contraseñas ingresadas deben de ser iguales",
        buttons: ['Aceptar']
      });

      await alerta.present();

      return;
    }

    this.registerService.registerUsuario(formulario).subscribe(
      (response) => {
        console.log(response.message)
        if (response.success) {
          this.navCtrl.navigateRoot('home');
        }
      }
    );
    
  }

  /*async guardar()
  {
    var formulario = this.formularioRegistro.value;

    if (this.formularioRegistro.invalid){
      const alerta = await this.alertCtrl.create({
        header: "Datos incompletos",
        message: "Tienes que llenar todos los datos",
        buttons: ['Aceptar']
      });

      // await this.alerta.present();
      return;
    }

    var usuario = {
      rut:formulario.rut,
      password:formulario.password
    }

    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.navCtrl.navigateRoot("login");
  }*/

}
