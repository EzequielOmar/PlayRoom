/**
 * formato de usuario para guardar en base de datos
 */
export interface UserData {
  email: string;
  username: string;
  createdAt: string; //Date.toLocalString()
  lastModifAt: string; //Date.toLocalString()
}
export interface User {
  uid: string;
  data: UserData;
}
