import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

type Primitive = string | number | boolean;
export type QueryParams = Record<string, Primitive | null | undefined>;

export abstract class ApiService<T> {
  protected baseUrl = environment.baseUrl;
  protected abstract endpoint: string;

  constructor(protected http: HttpClient) {}

  private get fullUrl(): string {
    return `${this.baseUrl}/${this.endpoint}`;
  }

  protected get<R = T>(params?: QueryParams): Observable<R> {
    return this.http.get<R>(this.fullUrl, {
      params: this.buildParams(params)
    });
  }

  protected post<B, R = T>(body: B, path?: string): Observable<R> {
    const url = path ? `${this.baseUrl}/${this.endpoint}/${path}` : this.fullUrl;
    return this.http.post<R>(url, body);
  }

  protected put<B, R = T>(body: B): Observable<R> {
    return this.http.put<R>(this.fullUrl, body);
  }


  protected delete<R = T>(): Observable<R> {
    return this.http.delete<R>(this.fullUrl);
  }

  private buildParams(params?: QueryParams): HttpParams {
    let httpParams = new HttpParams();

    if (!params) return httpParams;

    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        httpParams = httpParams.set(key, String(value));
      }
    });

    return httpParams;
  }
}
