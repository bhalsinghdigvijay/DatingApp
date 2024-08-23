import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';
import { map, Observable } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {

  
  const toastr = inject(ToastrService);
  
  const user = JSON.parse(localStorage.getItem("user"));

  if(user){
    return true;
  }

  toastr.error("You shall not pass!");
  return false;
  
};
