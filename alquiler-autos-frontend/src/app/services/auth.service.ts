import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8081/api/auth';

  constructor(private http: HttpClient) {}


  login(username: string, password: string, rol: string) {
  return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { username, password, rol })
    .pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('rol', rol);
      })
    );
}


  register(username: string, password: string, rol: string): Observable<string> {
    return this.http.post(
      `${this.apiUrl}/register`,
      { username, password, rol },
      { responseType: 'text' }
    );
  }

 
  logout(): void {
    localStorage.removeItem('token');
  }


  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }


  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
