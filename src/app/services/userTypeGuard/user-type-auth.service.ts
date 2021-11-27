import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class UserTypeGuardService implements CanActivate {
  constructor(
    public auth: AuthService,
    public router: Router,
    private udb: UserService
  ) {}

  canActivate = async (route: ActivatedRouteSnapshot): Promise<boolean> => {
    const expectedType = route.data.expectedType;
    return new Promise(async (res) => {
      if (!this.auth.currentUser) this.declineAccess(res);
      await this.udb
        .getUser(this.auth.currentUser?.uid ?? '')
        .then((doc: any) => {
          let user = { uid: doc.id, data: doc.data() } as User;
          user.data.type === expectedType ? res(true) : this.declineAccess(res);
        });
    });
  };

  private declineAccess(res: any) {
    res(false);
    this.router.navigate(['/home']);
  }
}
