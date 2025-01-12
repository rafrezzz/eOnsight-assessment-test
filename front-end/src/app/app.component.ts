import { Component } from '@angular/core';
import { MapComponent } from './components/map/map.component';

/**
 * Root component of the Angular application.
 * Serves as the entry point and parent container for other components.
 */
@Component({
  selector: 'app-root', 
  imports: [MapComponent], 
  standalone: true, // Declares the component as standalone
  templateUrl: './app.component.html', 
  styleUrl: './app.component.css', 
})
export class AppComponent {
  title = 'front-end'; 
}