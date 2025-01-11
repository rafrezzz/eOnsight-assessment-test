import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HubeauService {
  private apiUrl = 'https://hubeau.eaufrance.fr/api/v1/hydrometrie/referentiel/stations';

  constructor(private http: HttpClient) {}

  getStations(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?code_departement=06&format=json`);
  }
}