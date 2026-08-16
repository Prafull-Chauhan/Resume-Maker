import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-template-builder',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './template-builder.component.html',
  styleUrls: ['./template-builder.component.css']
})
export class TemplateBuilderComponent {
  elements: Array<{ id: number; type: string; label: string }> = [];

  addField(type: string) {
    this.elements.push({
      id: Date.now(),
      type,
      label: `New ${type} Field`
    });
  }

  removeField(id: number) {
    this.elements = this.elements.filter(el => el.id !== id);
  }
}