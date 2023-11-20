import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { RegistroModel } from '../model/registro-model';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ServicioRegistroService {

  constructor(private http: HttpClient) {}

  getLogins(): Observable<RegistroModel[]> {
    return this.http.get<RegistroModel[]>(`http://homestead.test/api/login/obtener`)
      .pipe(tap(data => console.log('Respuesta del servidor:', data)));
  }

  autenticar(usuario: RegistroModel): Observable<any> {
    return this.http.post(`http://homestead.test/api/login`, usuario)
      .pipe(tap(data => console.log('Respuesta del servidor:', data)));
  }
}
