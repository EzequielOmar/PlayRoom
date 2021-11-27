export class Validator {
  static email = (email: string): string => {
    const validEmail =
      email.endsWith('@gmail.com') ||
      email.endsWith('@hotmail.com') ||
      email.endsWith('@saladejuegos.com');
    if (!validEmail) {
      throw new Error('El nombre del proveedor no corresponde.');
    }
    return email;
  };
}
