import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: Observable<firebase.User | null>;
  constructor(private angularFireAuth: AngularFireAuth) {
    this.userData = angularFireAuth.authState;
  }

  private SignUpWithProvider = async (provider: any) => {
    this.angularFireAuth.signInWithPopup(provider).then(function (result) {
      // This gives you a Google Access Token.
      //var token = result.credential.accessToken;
      // The signed-in user info.
      //var user = result.user;
      // console.log(result);
      return;
    });
  };

  SignUpWithGoogle = async () => {
    let provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    this.SignUpWithProvider(provider);
  };

  /* Sign up */
  /**
   * Recibe email y pass, crea a un nuevo usuario
   * errores:
   *  auth/email-already-in-use
   *  auth/invalid-email
   *  auth/operation-not-allowed
   *  auth/weak-password
   * @param email string email del nuevo usuario
   * @param password string password del nuevo usuario
   */
  SignUp(email: string, password: string) {
    this.angularFireAuth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        //console.log(res);
        return res;
      })
      .catch((error) => {
        //console.log(error);
        return error;
      });
  }

  /**
   * Recibe email y pass, chequea
   * exito: loguea y retorna respuesta
   * error: retorna error.code:
   *  auth/invalid-email
   *  auth/user-disabled
   *  auth/user-not-found
   *  auth/wrong-password
   * @param email string email del usuario
   * @param password string password del usuario
   */
  SignIn = async (email: string, password: string) => {
    await this.angularFireAuth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        //console.log(res);
        return res;
      })
      .catch((error) => {
        //console.log(error);
        return error;
      });
  };

  /* Sign out */
  SignOut() {
    //console.log(this.angularFireAuth.signOut());
    this.angularFireAuth.signOut();
  }
}
