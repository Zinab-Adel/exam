import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '@app/core/service/api-service';
import { IDiploma } from './model/diploma.model';

@Injectable({
  providedIn: 'root',
})
export class Diplomas extends ApiService<IDiploma> {
  protected  endpoint: string = "diplomas";
  

  constructor(http: HttpClient) {
    super(http);
  }

  getDiplomas(pagenation: {}): Observable<ApiResponse<IDiploma[]>> {
    return this.get<ApiResponse<IDiploma[]>>(pagenation);
  }
}
