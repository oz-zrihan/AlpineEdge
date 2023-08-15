import { Observable, map } from 'rxjs';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AccountService } from 'src/app/account/account.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private accountService: AccountService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.accountService.currentUSer$.pipe(
      map((auth) => {
        if (auth) {
          return true;
        } else {
          this.router.navigate(['/account/login'], {
            queryParams: { returnUrl: state.url },
          });

          return false;
        }
      })
    );
  }
}
