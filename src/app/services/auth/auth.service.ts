import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';
import { Validator } from './Validators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: Observable<firebase.User | null>;
  constructor(private angularFireAuth: AngularFireAuth) {
    this.user = angularFireAuth.authState;
  }

  // Obtener el estado de autenticación
  get authenticated(): boolean {
    return this.user != null; // True ó False
  }

  // Obtener el observador del usuario actual
  get currentUser(): Observable<firebase.User | null> {
    return this.user;
  }

  /*
   * Recibe email y pass
   * Success -> loguea al usuario actualizando
   * el estado de user(Observable) y retorna respuesta (evento y usuario)
   * Error-> retorna el texto del error que corresponda listo
   * para imprimir en pantalla.
   * *Posibles errores de signInWithEmailAndPassword:*
   *  auth/invalid-email
   *  auth/user-disabled
   *  auth/user-not-found
   *  auth/wrong-password
   * @param email string email del usuario
   * @param password string password del usuario  */
  signIn = async (email: string, password: string) =>
    await this.angularFireAuth
      .signInWithEmailAndPassword(Validator.email(email), password)
      .then((res) => res)
      .catch((error) => {
        if (error.code === 'auth/user-disabled') {
          throw new Error('El usuario ha sido deshabilitado.');
        }
        if (error.code === 'auth/user-not-found') {
          throw new Error('No existe un usuario con estos datos.');
        }
        throw new Error('Datos incorrectos.');
      });

  /*
   * Recibe email y pass
   * Success -> crea y loguea al nuevo usuario actualizando
   * el estado de user(Observable), guarda el username (si no es un string vacio) en el current user
   * Envía el mail de verificación y retorna respuesta (evento y usuario)
   * Error-> retorna el texto del error que corresponda listo
   * para imprimir en pantalla.
   * *Posibles errores de createUserWithEmailAndPassword:*
   *  auth/email-already-in-use
   *  auth/invalid-email
   *  auth/operation-not-allowed
   *  auth/weak-password
   * @param email string email del usuario
   * @param password string password del usuario
   */
  signUp = async (email: string, password: string, username: string) =>
    await this.angularFireAuth
      .createUserWithEmailAndPassword(Validator.email(email), password)
      .then((res) => {
        if (username != '') {
          firebase.auth().currentUser?.updateProfile({
            displayName: username,
            //  photoURL: 'https://example.com/jane-q-user/profile.jpg',
          });
        }
        firebase.auth().currentUser?.sendEmailVerification();
        return res;
      })
      .catch((error) => {
        if (error.code === 'auth/operation-not-allowed') {
          throw new Error(
            'Lo siento, hubo un error interno. Vuelva a intentarlo mas tarde.'
          );
        }
        throw new Error('Datos incorrectos.');
      });

  /**
   * Envía el mail para recuperar contraseña
   * lanza error si el mail no corresponde a un usuario
   * @param email user email
   */
  passRecovery = async (email: string) => {
    this.angularFireAuth.sendPasswordResetEmail(email).catch(() => {
      throw new Error('Email incorrecto.');
    });
  };

  /**
   * Termina la sesion del usuario activo
   * actualiza user(Observable) = null
   */
  signOut = async () => {
    await this.angularFireAuth.signOut();
  };

  /*
   * Abre la ventana encargada de elegir la cuenta de google para loguearse.
   * @returns retorna el evento (contiene el usuario)
   * o throw error con mensaje listo para mostrar
   * res.credential.accessToken -> Google Acces Token
   * res.user -> datos del usuario logueado
   */
  signUpWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    return await this.signUpWithProvider(provider);
  };

  /*
   * Abre la ventana encargada de elegir la cuenta de twitter para loguearse.
   * @returns retorna el evento (contiene el usuario)
   * o throw error con mensaje listo para mostrar
   * res.credential.accessToken -> Google Acces Token
   * res.user -> datos del usuario logueado
   */
  signUpWithTwitter = async () => {
    const provider = new firebase.auth.TwitterAuthProvider();
    return await this.signUpWithProvider(provider);
  };

  private signUpWithProvider = async (provider: any) =>
    await this.angularFireAuth
      .signInWithPopup(provider)
      .then((res) => res)
      .catch(() => {
        throw new Error('Operación cancelada.');
      });
}
