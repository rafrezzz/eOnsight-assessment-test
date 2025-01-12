import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { HubeauService } from '../../services/hubeau.service';
import { BridgeService, Bridge } from '../../services/bridge.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { SwitchComponent } from '../switch/switch.component';

/**
 * MapComponent is responsible for displaying a map with station markers and bridge markers.
 * It provides interactions such as switching between operational stations and displaying details of a selected station.
 */
@Component({
  selector: 'app-map',
  standalone: true, 
  imports: [SidebarComponent, SwitchComponent], 
  templateUrl: './map.component.html', 
  styleUrls: ['./map.component.css'], 
})
export class MapComponent implements OnInit {
  private map!: L.Map; 
  selectedStation: any | null = null; // Currently selected station
  showOnlyOperational: boolean = false; // State of the switch for showing only operational stations
  private markers: L.Marker[] = []; // Array to store dynamically added markers
  private stations: any[] = []; // Array to store all station data

  constructor(
    private hubeauService: HubeauService, 
    private bridgeService: BridgeService 
  ) {}

  /**
   * Lifecycle hook that initializes the map and loads station and bridge data.
   */
  ngOnInit(): void {
    this.initMap();
    this.loadStations();
    this.loadBridges();
  }

  /**
   * Initializes the Leaflet map with bounds, zoom limits, and a tile layer.
   */
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

  /**
   * Loads station data and updates map markers.
   */
  private loadStations(): void {
    this.hubeauService.getStations().subscribe({
      next: (response: { data: any[] }) => {
        this.stations = response.data; 
        this.updateMarkers(); 
      },
      error: (err) => {
        console.error('Error while loading stations', err);
      },
    });
  }

  /**
   * Loads bridge data and adds markers for bridges on the map.
   */
  private loadBridges(): void {
    this.bridgeService.getBridges().subscribe({
      next: (bridges: Bridge[]) => {
        bridges.forEach((bridge) => {
          const [lng, lat] = this.parseLocation(bridge.location);

          L.marker([lat, lng], {
            icon: L.icon({
              iconUrl: 'bridge_marker.svg', 
              iconSize: [30, 30], 
              iconAnchor: [15, 15], 
            }),
          })
            .addTo(this.map)
            .bindPopup(`<strong>${bridge.name}</strong>`); // Popup with bridge name
        });
      },
      error: (err) => console.error('Error while loading bridges', err),
    });
  }

  /**
   * Parses a location string in the format "SRID=4326;POINT (lng lat)" to extract coordinates.
   * @param location - Location string to parse
   * @returns Array containing [longitude, latitude]
   */
  private parseLocation(location: string): [number, number] {
    const match = location.match(/POINT \(([\d.-]+) ([\d.-]+)\)/);
    if (match) {
      const lng = parseFloat(match[1]);
      const lat = parseFloat(match[2]);
      return [lng, lat];
    }
    throw new Error('Invalid location format');
  }

  /**
   * Updates map markers based on station data and switch state.
   */
  private updateMarkers(): void {
    // Remove existing markers
    this.markers.forEach((marker) => this.map.removeLayer(marker));
    this.markers = [];

    // Filter stations based on the operational status switch
    const filteredStations = this.showOnlyOperational
      ? this.stations.filter((station) => station.en_service)
      : this.stations;

    // Add markers for filtered stations
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
          .on('click', () => this.onStationClick(station)); // Handle station click

        this.markers.push(marker);
      }
    });
  }

  /**
   * Handles the selection of a station when its marker is clicked.
   * @param station - The station data to display
   */
  private onStationClick(station: any): void {
    this.selectedStation = station; 
  }

  /**
   * Toggles the display of only operational stations.
   * @param showOnlyOperational - State of the operational switch
   */
  toggleOperationalStations(showOnlyOperational: boolean): void {
    this.showOnlyOperational = showOnlyOperational; 
    this.updateMarkers(); // Refresh markers based on the switch state
  }
}