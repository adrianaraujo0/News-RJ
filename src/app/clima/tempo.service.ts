import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TempoService {
  private chaveApi = '47cda077cad71fc622b438aa037096e7';
  private urlApi = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) { }

  obterClimaPorCoordenadas(lat: number, lon: number): Observable<any> {
    return this.http.get(`${this.urlApi}?lat=${lat}&lon=${lon}&appid=${this.chaveApi}&units=metric&lang=pt_br`);
  }

  obterClimaPorCidade(cidade: string): Observable<any> {
    return this.http.get(`${this.urlApi}?q=${cidade}&appid=${this.chaveApi}&units=metric&lang=pt_br`);
  }
}

//https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=47cda077cad71fc622b438aa037096e7&units=metric&lang=pt_br
