import { ChangeDetectorRef, Component } from '@angular/core';
import { CuposModel } from '../model/cupos-model';
import { ServicioCupoService } from '../servicios/servicio-cupo.service';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  gimnasios: { sector: string, opciones: { hora: string, cupos: number, cuposDisponibles: number }[] }[] = [];
  nombreGimnasioSeleccionado: { hora: string, cupos: number, cuposDisponibles: number, reservado: boolean } | null = null;

  constructor(
    private servicioCupo: ServicioCupoService,
    private cdr: ChangeDetectorRef,
    private toastController: ToastController,
    public navCtrl: NavController) {}


  ngOnInit() {
    this.obtenerCuposDisponibles();
  }

  obtenerCuposDisponibles() {
    this.servicioCupo.getCuposDisponibles().subscribe((data: CuposModel[] | undefined) => {
      if (data) {
        const sectores = [...new Set(data.map(item => item.sector))];

        this.gimnasios = sectores.map(sector => {
          const opciones = data
            .filter(item => item.sector === sector)
            .map(item => ({ hora: item.horas, cupos: item.cupos, cuposDisponibles: item.cupos }));

          return { sector, opciones };
        });
      } else {
        console.error('No se pudo obtener la información de los cupos disponibles.');
      }
    });
  }

  reservarCupo() {
    if (this.nombreGimnasioSeleccionado) {
      const { cuposDisponibles, reservado } = this.nombreGimnasioSeleccionado;

      if (cuposDisponibles > 0 && !reservado) {
        // Realizar la lógica de reserva aquí se resta nomas
        this.nombreGimnasioSeleccionado.cuposDisponibles--;
        this.nombreGimnasioSeleccionado.reservado = true;

        // Actualizar el modelo directamente
        this.nombreGimnasioSeleccionado = { ...this.nombreGimnasioSeleccionado };

        // Forzar la detección de cambios
        this.cdr.detectChanges();

        // Mostrar mensaje de reserva exitosa
        this.mostrarMensaje('Se ha reservado correctamente');
      } else {
        // Lógica cuando no hay cupos disponibles o ya está reservado
        if (reservado) {
          console.log('Ya se ha reservado un cupo para esta hora.');
        } else {
          console.log('No hay cupos disponibles para reservar en esta hora.');
        }
      }
    }
  }
  async mostrarMensaje(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000, // Duración en milisegundos del mensaje
      position: 'middle' // Posición del mensaje en la pantalla (puedes ajustarla según tus preferencias)
    });
    toast.present();
  }
  salir(){
    //Cambia el estado "ingresado" de localstorage a "false"
    localStorage.setItem("ingresado","false");
    //redirige la aplicación a "login"
    this.navCtrl.navigateRoot("login");
  }

}
