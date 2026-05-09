import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IDiploma } from '@app/api/diploma/model/diploma.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-diploma-card',
  imports: [CommonModule, RouterLink],
  templateUrl: './diploma-card.html',
  styleUrl: './diploma-card.css',
})
export class DiplomaCard {
  @Input() diploma!: IDiploma;
}
