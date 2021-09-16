/**
 * formato de usuario para guardar en base de datos
 */
export interface I_UserDb {
  email: string;
  username: string;
  createdAt: string;
}

/**
 * formato de usuario para guardar en localstorage
 */
export interface I_UserSession {
  uid:string;
  username:string;
  email:string;
}
