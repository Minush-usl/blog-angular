import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { User, FbAuthResponse } from 'src/app/shared/interfaces';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators'


@Injectable()

export class AuthService {
    constructor(private http: HttpClient) { }

    get token(): string {
        const expDate = new Date(localStorage.getItem('fb-token-exp'))

        if (new Date() > expDate) {
            // CHECKING IF THE LIFETIME OF THE TOKEN HAS GONE
            this.logout
            return null
        }
        return localStorage.getItem('fb-token')
    }

    login(user: User): Observable<any> {
        user.returnSecureToken = true
        return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
            .pipe(
                tap(this.setToken)
            )
    }

    logout() {
        // CLEARING THE TOKEN
        this.setToken(null)
    }

    isAuthenticated() {
        return !!this.token
    }

    private setToken(response: FbAuthResponse | null) {
        if (response) {  
            // IF TOKEN IS NOT NULL
            const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000)
            localStorage.setItem('fb-token', response.idToken)
            localStorage.setItem('fb-token-exp', expDate.toString())
        } else {
            localStorage.clear()
        }
    }
}