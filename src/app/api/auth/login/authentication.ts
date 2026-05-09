import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/service/api-service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Authentication extends ApiService<Login> {
  protected  endpoint: string = "auth/login";
  constructor(http: HttpClient) {
    super(http);
  }

  login(credentials: Login): Observable<any> {
    return this.post<Login>(credentials);
  }
}
