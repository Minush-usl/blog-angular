import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()

export class AuthGuard implements CanActivate {

    constructor( 
        private auth: AuthService,
        private router: Router
        ) {}

    path: ActivatedRouteSnapshot[];
    route: ActivatedRouteSnapshot;

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        if (this.auth.isAuthenticated()) {
            return true
        } else{
            this.auth.logout()
            this.router.navigate(['/admin', 'login'], {
                queryParams: {
                    loginAgain: true
                }
            })
        }
        
    }

}