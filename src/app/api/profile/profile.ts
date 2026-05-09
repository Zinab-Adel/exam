import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '@app/core/service/api-service';

@Injectable({
  providedIn: 'root',
})
export class Profile extends ApiService<IProfile> {
  protected  endpoint: string = "users/profile";
  

  constructor(http: HttpClient) {
    super(http);
  }

  getUserData(): Observable<ApiResponse<IProfile>> {
    return this.get<ApiResponse<IProfile>>();
  }
}
