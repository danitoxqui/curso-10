import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apikey = 'AIzaSyBSQqw4AXSCaxo1voSe-H8tgPbRumQmK7I';

  userToken: any;

  // CREAR NUEVOS USUARIOS
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]


  // Login
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]


  constructor( private http:HttpClient ) {
    this.leerToken();
  }

  logout() {

  }

  login( usuario: UsuarioModel ) {

    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(`${this.url}signInWithPassword?key=${this.apikey}`, authData)
      .pipe(
        map((resp: any) => {
          if ('idToken' in resp) {
            console.log('Entro en rxjs');
            this.guardarToken(resp['idToken']);
          } else {
            // Manejo de error o situación inesperada al no encontrar 'idToken' en la respuesta
          }
          return resp;
        })
      );
  }

  nuevoUsuario( usuario: UsuarioModel ) {

    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(`${this.url}signUp?key=${this.apikey}`, authData)
    .pipe(
      map((resp: any) => {
        if ('idToken' in resp) {
          this.guardarToken(resp['idToken']);
        } else {
          // Manejo de error o situación inesperada al no encontrar 'idToken' en la respuesta
        }
        return resp;
      })
    );

  }

  private guardarToken( idToken: string){

    this.userToken = idToken;
    localStorage.setItem('token',idToken);

  }

  leerToken() {
    if ( localStorage.getItem('token') ) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }

    return this.userToken;
  }

}

