import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '@app/core/service/api-service';

@Injectable({
  providedIn: 'root',
})
export class Exams extends ApiService<any> {
  protected  endpoint: string = "exams";
  

  constructor(http: HttpClient) {
    super(http);
  }

  getExams(): Observable<ApiResponse<any>> {
    return this.get<ApiResponse<any>>();
  }
}
