import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { inject } from "@angular/core";
import { map, take } from "rxjs";
import { AuthService } from "../services/auth.service";

export const AuthenticateGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const router = inject(Router);
    const authService = inject(AuthService);
    return authService.emitter.pipe(
        take(1), 
        map((user) => {
            if (!user || !user.token){
                return router.createUrlTree(['auth', 'signin'], { queryParams: { returnUrl: state.url } });
            }
            return true;
        })
    )
}