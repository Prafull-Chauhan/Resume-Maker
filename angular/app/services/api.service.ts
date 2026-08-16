import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  getApplications(): Observable<any> { return this.http.get(`${this.baseUrl}/applications`, { headers: this.getHeaders() }); }
  createTemplate(data: any): Observable<any> { return this.http.post(`${this.baseUrl}/documents/templates`, data, { headers: this.getHeaders() }); }
  generateDocument(payload: any): Observable<any> { return this.http.post(`${this.baseUrl}/documents`, payload, { headers: this.getHeaders() }); }
}