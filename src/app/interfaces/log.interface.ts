export const events = {
  signUp: 'signup-Email/Pass',
  signUpGoogle: 'signup-Google',
  signUpTwitter: 'signup-Twitter',
  logIn: 'login-Email/Pass',
  logInGoogle: 'login-Google',
  logInTwitter: 'login-Twitter',
  logOut: 'logout',
};

export interface Log {
  uid: string;
  event: string;
  datetime: string;//Data.toLocalString()
}
