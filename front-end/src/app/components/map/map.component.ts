import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { HubeauService } from '../../services/hubeau.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { SwitchComponent } from '../switch/switch.component';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [SidebarComponent, SwitchComponent],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  private map!: L.Map;
  selectedStation: any | null = null; // Station sélectionnée
  showOnlyOperational: boolean = false; // État du switch pour afficher uniquement les stations en service
  private markers: L.Marker[] = []; // Stocker les marqueurs pour gestion dynamique
  private stations: any[] = []; // Stocker toutes les stations

  constructor(private hubeauService: HubeauService) {}

  ngOnInit(): void {
    this.initMap();
    this.loadStations();
  }

  private initMap(): void {
    const bounds = L.latLngBounds([43.0, 5.7], [44.7, 7.6]);

    this.map = L.map('map', {
      center: [43.9, 7.26],
      zoom: 10,
      maxBounds: bounds,
      maxBoundsViscosity: 1.0,
      zoomControl: false,
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; CartoDB "light_all" tiles',
    }).addTo(this.map);

    this.map.setMinZoom(8);
    this.map.setMaxZoom(15);
  }

  private loadStations(): void {
    this.hubeauService.getStations().subscribe({
      next: (response: { data: any[] }) => {
        this.stations = response.data;
        this.updateMarkers(); // Mettre à jour les marqueurs en fonction des stations chargées
      },
      error: (err) => {
        console.error('Erreur lors du chargement des stations', err);
      },
    });
  }

  private updateMarkers(): void {
    // Supprimer les anciens marqueurs
    this.markers.forEach((marker) => this.map.removeLayer(marker));
    this.markers = [];

    // Filtrer les stations en fonction de l'état du switch
    const filteredStations = this.showOnlyOperational
      ? this.stations.filter((station) => station.en_service)
      : this.stations;

    // Ajouter les marqueurs filtrés
    filteredStations.forEach((station: any) => {
      if (station.geometry) {
        const [lng, lat] = station.geometry.coordinates;

        const marker = L.marker([lat, lng], {
          icon: station.en_service
            ? L.icon({
                iconUrl: 'station_marker.svg',
                iconSize: [20, 33],
                iconAnchor: [10, 33],
              })
            : L.icon({
                iconUrl: 'non_operational_station_marker.svg',
                iconSize: [20, 33],
                iconAnchor: [10, 33],
              }),
        })
          .addTo(this.map)
          .on('click', () => this.onStationClick(station)); // Gérer le clic sur la station

        this.markers.push(marker);
      }
    });
  }

  private onStationClick(station: any): void {
    this.selectedStation = station; // Mettre à jour la station sélectionnée
  }

  toggleOperationalStations(showOnlyOperational: boolean): void {
    this.showOnlyOperational = showOnlyOperational; // Mettre à jour l'état du switch
    this.updateMarkers(); // Mettre à jour les marqueurs
  }
}