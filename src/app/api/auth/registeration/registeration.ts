import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/service/api-service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Registration extends ApiService<any> {
  protected  endpoint: string = "auth";
  

  constructor(http: HttpClient) {
    super(http);
  }

  sendEmailVerification(credentials: IEmailVerification): Observable<IEmailVerification> {
    return this.post<IEmailVerification>(credentials, "send-email-verification");
  }

  sendOtpVerification(data: any): Observable<IOtpVerification> {
    return this.post<IOtpVerification>(data, "confirm-email-verification");
  }

  registeration(data: any): Observable<IOtpVerification> {
    return this.post<IOtpVerification>(data, "register");
  }


}
