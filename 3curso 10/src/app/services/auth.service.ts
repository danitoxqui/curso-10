import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';

import { map } from 'rxjs/operators';


interface AuthResponse {
  idToken: string;
  // Otras propiedades si las tienes en la respuesta
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1';
  private apikey = 'AIzaSyBSQqw4AXSCaxo1voSe-H8tgPbRumQmK7I';

  userToken: string| null ="";
 // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]


 // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor( private http: HttpClient) {
    this.leerToken();
  }





  logout(){

  }

  login(usuario: UsuarioModel){
    const authData = {
      ...usuario,
      returnSecureToken:true
    };

    return this.http.post<AuthResponse>(
      `${this.url}/verifyPassword?key=${this.apikey}`,
      authData
    ).pipe(
      map((resp: AuthResponse) => {
        this.guardarToken(resp.idToken);
        return resp;
      })
    );

  }

  nuevoUsuario(usuario: UsuarioModel){

    const authData = {
      ...usuario,
      returnSecureToken:true
    };

    return this.http.post<AuthResponse>(
      `${this.url}/signupNewUser?key=${this.apikey}`,
      authData
    ).pipe(
      map((resp: AuthResponse) => {
        this.guardarToken(resp.idToken);
        return resp;
      })
    );

  }


  private guardarToken( idToken:string){
    this.userToken = idToken;
    localStorage.setItem('token', idToken);

  }

  leerToken(){

    if( localStorage.getItem('token')){
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }

    return this.userToken
  }




}
