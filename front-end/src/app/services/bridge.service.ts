import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Interface to represent a bridge structure.
 */
export interface Bridge {
  bridge_id: string; // Unique identifier for the bridge
  name: string;      // Name of the bridge
  location: string;  // Location of the bridge in WKT (Well-Known Text) format
}

/**
 * Service to handle bridge-related API operations.
 * Provides methods to fetch bridge data from the backend.
 */
@Injectable({
  providedIn: 'root', // Makes the service available throughout the application
})
export class BridgeService {
  private apiUrl = 'http://127.0.0.1:8000/api/bridges/'; // API endpoint for bridges

  constructor(private http: HttpClient) {}

  /**
   * Fetches the list of bridges from the API.
   * @returns An Observable of an array of Bridge objects.
   */
  getBridges(): Observable<Bridge[]> {
    return this.http.get<Bridge[]>(this.apiUrl);
  }
}