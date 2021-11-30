import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { UserService } from '../services/user/user.service';

@Pipe({
  name: 'uidNamePipe',
})
export class UidNamePipePipe implements PipeTransform {
  constructor(private us: UserService) {}

  transform = async (uid: string): Promise<string> => {
    return await this.us
      .getUser(uid)
      .then((doc: any) => {
        let u: User = { uid: doc.id, data: doc.data() };
        return u.data?.username ?? u.data?.email ?? 'Anonymous';
      })
      .catch(() => {
        return 'Anonymous';
      });
  };
}
