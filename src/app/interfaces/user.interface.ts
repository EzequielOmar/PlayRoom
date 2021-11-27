/**
 * formato de usuario para guardar en base de datos
 */

export const UserProfileType = {
  admin: 1,
  user: 2,
};
export interface UserData {
  email: string;
  username: string;
  type: number; //UserProfileType
  createdAt: string; //Date.toLocalString()
  lastModifAt: string; //Date.toLocalString()
  deletedAt: string; //Date.toLocalString()
}
export interface User {
  uid: string;
  data: UserData;
}
