import { Component, EventEmitter, Output } from '@angular/core';

/**
 * A switch component used to toggle a boolean state.
 * Emits the state change to the parent component when toggled.
 */
@Component({
  selector: 'app-switch', 
  standalone: true, 
  templateUrl: './switch.component.html', 
  styleUrls: ['./switch.component.css'], 
})
export class SwitchComponent {
  @Output() toggleChange = new EventEmitter<boolean>(); // Event emitter to notify parent component of toggle state
  isChecked: boolean = false; 

  /**
   * Handles the toggle event and emits the new state.
   * @param event The DOM event triggered by the toggle switch
   */
  onToggle(event: Event): void {
    this.isChecked = (event.target as HTMLInputElement).checked; // Update the state based on the toggle value
    this.toggleChange.emit(this.isChecked);
  }
}