import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphComponent } from '../graph/graph.component';

/**
 * SidebarComponent displays detailed information about a selected station.
 * It also includes the GraphComponent to show station-specific data visualization.
 */
@Component({
  selector: 'app-sidebar', 
  standalone: true, 
  imports: [CommonModule, GraphComponent], 
  templateUrl: './sidebar.component.html', 
  styleUrls: ['./sidebar.component.css'], 
})
export class SidebarComponent {
  @Input() selectedStation: any | null = null; // The currently selected station data passed from the parent component
}