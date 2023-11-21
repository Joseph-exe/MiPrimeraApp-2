import { Component } from '@angular/core';
import { CuposModel } from '../model/cupos-model';
import { ServicioCupoService } from '../servicios/servicio-cupo.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  gimnasios: { sector: string, opciones: { hora: string, cupos: number }[] }[] = [];
  nombreGimnasioSeleccionado: { hora: string, cupos: number } | null = null;

  constructor(private servicioCupo: ServicioCupoService) {}

  ngOnInit() {
    this.obtenerCuposDisponibles();
  }

  obtenerCuposDisponibles() {
    this.servicioCupo.getCuposDisponibles().subscribe((data: CuposModel[]) => {
      const sectores = [...new Set(data.map(item => item.sector))];

      this.gimnasios = sectores.map(sector => {
        const opciones = data
          .filter(item => item.sector === sector)
          .map(item => ({ hora: item.horas, cupos: item.cupos }));

        return { sector, opciones };
      });
    });
  }

  obtenerHorasDisponibles() {
    // Obtén las horas y cupos disponibles en todos los sectores
    const horasYCupos = this.gimnasios.reduce((acc, gimnasio) => {
      return acc.concat(gimnasio.opciones.map(opcion => ({ hora: opcion.hora, cupos: opcion.cupos })));
    }, [] as { hora: string, cupos: number }[]);

    return horasYCupos;
  }
}
