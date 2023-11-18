import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  formularioRegistro: FormGroup;

  constructor(public fb:FormBuilder, public alertCtrl: AlertController, public navCtrl: NavController) { 
    this.formularioRegistro = this.fb.group({
      'nombre': new FormControl("",Validators.required),
      'password': new FormControl("",Validators.required),
      'confirmar': new FormControl("",Validators.required)
    })
  }

  ngOnInit() {
  }

  async guardar()
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
      nombre:formulario.nombre,
      password:formulario.password
    }

    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.navCtrl.navigateRoot("login");
  }

}
