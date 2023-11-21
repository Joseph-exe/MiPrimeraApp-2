import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { CuposModel } from '../model/cupos-model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicioCupoService {

  constructor(private http: HttpClient) {}

  getCuposDisponibles(): Observable<CuposModel[]> {
    return this.http.get<CuposModel[]>('http://homestead.test/api/cupos-disponibles')
      .pipe(tap(data => console.log('Respuesta del servidor:', data)));
  }
}
