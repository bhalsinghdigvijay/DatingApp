import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';
import { map } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {

  const toastr = inject(ToastrService);
  const accountService = inject(AccountService);

  return accountService.currentUser$.pipe(
    map((user) => {
      if(user.roles.includes("Admin") || user.roles.includes("Moderator")) {
        return true;
      }
      toastr.error("You cannot enter this area");
      return false;
    })
  );
};
