import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, filter, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../shared/interfaces';

const apiUrl = environment.apiUrl
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private user$$ = new BehaviorSubject<undefined | null | IUser>(undefined);
  // user$ = this.user$$.asObservable().pipe(
    //   filter((val): val is IUser | null => val !== undefined)
    // );
    
    
    user: null | IUser | undefined;
    
    constructor(private http: HttpClient, private router: Router) { }
    isLogged(){
      if(localStorage.getItem('token')){
        return true
      }else{
        return false
      }
    }


  register(data: {}){
    return this.http.post<IUser>(`${apiUrl}/register`, data).pipe(
      tap((user) => {
        this.user = user
        localStorage.setItem('token', this.user.accessToken)
      })
    )
  }
  // return this.http.post<IUser>(`${API_URL}/register`, data).pipe(
  //   tap((user) => {
  //     this.user = user
  //     localStorage.setItem('token', this.user.accessToken)
  //   })
  // )
  login(data: {}){
    return this.http.post<IUser>(`${apiUrl}/login`, data).pipe(
      tap((user) => {
        this.user = user
        console.log(user.email)
        localStorage.setItem('token', this.user.accessToken)
      })
    )
  }
  logout(){
    this.user = null;
    return localStorage.removeItem('token')
  }
}
