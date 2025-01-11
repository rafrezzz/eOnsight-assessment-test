import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Bridge {
  bridge_id: string;
  name: string;
  location: string; 
}

@Injectable({
  providedIn: 'root',
})
export class BridgeService {
  private apiUrl = 'http://127.0.0.1:8000/api/bridges/';

  constructor(private http: HttpClient) {}

  getBridges(): Observable<Bridge[]> {
    return this.http.get<Bridge[]>(this.apiUrl);
  }
}