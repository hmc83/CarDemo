import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../../shared/services/auth.service";
import { inject } from "@angular/core";
import { map, take } from "rxjs";


export const CarEditAuthorizeGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const router = inject(Router);
    const authService = inject(AuthService);
    const ownerId = route.parent.params.ownerId;
    return authService.emitter.pipe(
        take(1), 
        map((user) => {
            if (user === null || user.token === null  || user.id !== ownerId) {
                return router.createUrlTree(['not-found'])
            }
            return true;
        })
    );
};