import { Component, Input, OnChanges } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { HubeauService } from '../../services/hubeau.service';

/**
 * GraphComponent is responsible for displaying a line chart
 * that shows water level data for a selected station.
 */
@Component({
  selector: 'app-graph', 
  standalone: true, 
  imports: [NgChartsModule, CommonModule], 
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
})
export class GraphComponent implements OnChanges {
  @Input() selectedStation: any; // Input property for the selected station

  // Chart data configuration
  public chartData: any[] = [
    {
      data: [], 
      label: 'Niveau de l\'eau (cm)', 
      borderColor: '#3C7CCC',
      backgroundColor: 'rgba(60, 124, 204, 0.2)', 
      pointBackgroundColor: '#3C7CCC', 
      pointBorderColor: '#3C7CCC',
      tension: 0.4, 
      fill: true, 
    },
  ];
  public chartLabels: string[] = [];
  public chartOptions = {
    responsive: true, // Makes the chart responsive
    plugins: {
      legend: {
        display: true, // Displays the chart legend
      },
    },
  };

  public isLoading = false; // Indicates if the data is being loaded
  public hasData = true; // Indicates if there is data to display

  // Set the start and end date to a fixed value because of the API issue
  //public startDate = '2025-01-05'; 
  //public endDate = '2025-01-11'; 

  // Dynamicly change the start and end date
  public startDate!: string;
  public endDate!: string;

  constructor(private hubeauService: HubeauService) {
    this.initializeDates();
  }

  /**
   * Initializes the startDate and endDate.
   */
  private initializeDates(): void {
    const today = new Date();
    const oneWeekAgo = new Date(today);
    oneWeekAgo.setDate(today.getDate() - 7);
  
    this.startDate = oneWeekAgo.toISOString().split('T')[0]; // Format: 'YYYY-MM-DD'
    this.endDate = today.toISOString().split('T')[0]; // Format: 'YYYY-MM-DD'
  }

  /**
   * Reacts to changes in the selected station and updates the chart accordingly.
   */
  ngOnChanges(): void {
    if (this.selectedStation) {
      this.isLoading = true; 
      this.hasData = true; // Assume data is available by default

      // Check if the station is operational
      if (!this.selectedStation.en_service) {
        this.isLoading = false; 
        this.hasData = false; // No data for non-operational station
        this.chartData[0].data = []; // Clear chart data
        this.chartLabels = []; // Clear chart labels
        return;
      }

      // Load observation data based on the selected station
      this.hubeauService
        .getObservations(this.selectedStation.code_station, this.startDate, this.endDate)
        .subscribe({
          next: (data) => {
            this.processObservations(data); // Process the received data
            this.isLoading = false;
          },
          error: (err) => {
            console.error('Error while loading observations', err);
            this.hasData = false; // No data available due to an error
            this.isLoading = false;
          },
        });
    }
  }

  /**
   * Processes the observation data and updates the chart.
   * @param data - The observation data to process
   */
  private processObservations(data: any[]): void {
    const groupedData = this.groupByDay(data); // Group data by day
    if (groupedData.length === 0) {
      this.hasData = false; // No data available
    } else {
      this.chartData[0].data = groupedData.map((item) => item.average); // Update chart data
      this.chartLabels = groupedData.map((item) => item.date); // Update chart labels
    }
  }

  /**
   * Groups observation data by day and calculates the average for each day.
   * @param data - Array of observation data
   * @returns Array of objects with date and average value
   */
  private groupByDay(data: any[]): { date: string; average: number }[] {
    const grouped: { [date: string]: number[] } = {};

    // Group data by date
    data.forEach((obs) => {
      const date = new Date(obs.date_obs).toISOString().split('T')[0];
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(obs.resultat_obs); // Add observation to the respective date
    });

    // Calculate average for each date
    return Object.keys(grouped).map((date) => {
      const values = grouped[date];
      const average = values.reduce((sum, val) => sum + val, 0) / values.length;
      return { date, average };
    });
  }
}