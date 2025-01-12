import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Service to interact with Hubeau API for hydrometry data.
 * Provides methods to fetch stations and observations data.
 */
@Injectable({
  providedIn: 'root', // Makes the service globally available
})
export class HubeauService {
  // API URLs for stations and observations
  private stationsApiUrl = 'https://hubeau.eaufrance.fr/api/v1/hydrometrie/referentiel/stations';
  private observationsApiUrl = 'https://hubeau.eaufrance.fr/api/v2/hydrometrie/observations_tr';

  // Local JSON file URLs for simulated data
  private localStationsUrl = 'data/stations.json';
  private localObservationsUrl = 'data/observations.json';

  constructor(private http: HttpClient) {}

  /**
   * Fetches stations data.
   * By default, uses local simulated data. Switch to the API by uncommenting the relevant line.
   * @returns An Observable containing stations data.
   */
  getStations(): Observable<any> {
    console.warn('Loading simulated stations data.');
    return this.http.get<any>(this.localStationsUrl);

    // Uncomment the line below to use the Hubeau API instead of local data
    // return this.http.get<any>(`${this.stationsApiUrl}?code_departement=06&format=json`);
  }

  /**
   * Fetches observations data for a specific station within a date range.
   * By default, uses local simulated data. Switch to the API by uncommenting the relevant block.
   * @param codeStation - The code of the station for which observations are required.
   * @param startDate - Start date for the observations.
   * @param endDate - End date for the observations.
   * @returns An Observable containing filtered observations data.
   */
  getObservations(codeStation: string, startDate: string, endDate: string): Observable<any[]> {
    console.warn('Loading simulated observations data.');
    return this.http.get<{ data: any[] }>(this.localObservationsUrl).pipe(
      map((response) =>
        // Filter observations by the selected station code
        response.data.filter((obs) => obs.code_station === codeStation)
      )
    );

    // Uncomment the block below to use the Hubeau API instead of local data
    /*
    const params = {
      code_entite: codeStation,
      grandeur_hydro: 'H', // Type of measurement (e.g., water level)
      date_debut_obs: startDate, // Start date for observations
      date_fin_obs: endDate, // End date for observations
      timestep: '60', // Time interval for data
      size: '20000', // Maximum number of records
    };

    return this.http.get<{ data: any[] }>(this.observationsApiUrl, { params }).pipe(
      map((response) => response.data) // Extract data from the API response
    );
    */
  }
}