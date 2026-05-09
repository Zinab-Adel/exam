import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card'; // استيراد مكون PrimeNG
import { IDiploma } from '@app/api/diploma/model/diploma.model';
import { DiplomaCard } from './diploma-card/diploma-card';
import { Diplomas } from '@app/api/diploma/diploma';

@Component({
  selector: 'app-diploma',
  imports: [CommonModule, CardModule, DiplomaCard],
  templateUrl: './diploma.html',
  styleUrl: './diploma.css',
})
export class Diploma {
  private diplomaService = inject(Diplomas);
  diplomas = signal<IDiploma[]>([]);
  currentPage = signal<number>(1);
  hasMore = signal<boolean>(true); 
  isLoading = signal<boolean>(false);

  ngOnInit(): void {
    this.getDiploma();
  }

  getDiploma() {
    if (this.isLoading() || !this.hasMore()) return;
    this.isLoading.set(true);
    this.diplomaService.getDiplomas({ page: this.currentPage(), limit: 10 }).subscribe({
      next: (res: any) => {
        const newData = res.payload.data;
        this.diplomas.update(currentItems => [...currentItems, ...newData]);
        const totalPages = res.payload.metadata.totalPages;
        if (this.currentPage() >= totalPages) {
          this.hasMore.set(false);
          return;
        }
        this.currentPage.update(page => page + 1);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.isLoading.set(false);
      }
    });
  }
}
