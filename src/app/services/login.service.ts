import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class LoginService {
    private apiUrl = environment.server + "/login" // URL della tua API
    private _isAuthenticated = false;
    private _isAuthenticatedSubject = new BehaviorSubject<boolean>(this._isAuthenticated);
    isAuthenticated$ = this._isAuthenticatedSubject.asObservable();
    constructor(private httpClient: HttpClient) { }
  
    get isAuthenticated() {
      return this._isAuthenticatedSubject.asObservable();
    }
  
    login() {
      this._isAuthenticated = true;
      this._isAuthenticatedSubject.next(this._isAuthenticated);
      sessionStorage.setItem('isAuthenticated', 'true'); // Salva lo stato in sessionStorage
    }
  
    logout() {
      this._isAuthenticated = false;
      this._isAuthenticatedSubject.next(this._isAuthenticated);
      sessionStorage.setItem('isAuthenticated', 'false'); // Salva lo stato in sessionStorage
    }
}