export const events = {
  LogIn: 1,
  LogOut: 2,
};

export interface logDb {
  event: number;
  datetime: string;
}
