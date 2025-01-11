import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-switch',
  standalone: true,
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.css'],
})
export class SwitchComponent {
  @Output() toggleChange = new EventEmitter<boolean>(); // Émet l'état du switch
  isChecked: boolean = false;

  onToggle(event: Event): void {
    this.isChecked = (event.target as HTMLInputElement).checked;
    this.toggleChange.emit(this.isChecked);
  }
}