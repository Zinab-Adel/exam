import { Component, inject, signal } from '@angular/core';
import { Exams } from '@app/api/exam/exam';

@Component({
  selector: 'app-exam',
  imports: [],
  templateUrl: './exam.html',
  styleUrl: './exam.css',
})
export class Exam {
  isLoading = signal<boolean>(false);
  exams = signal<any>([]);
  private examService = inject(Exams);
  
  getDiploma() {
    this.isLoading.set(true);
    this.examService.getExams().subscribe({
      next: (res: any) => {
        this.exams = res.payload.data;
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.isLoading.set(false);
      }
    });
  }
}
