export interface User {
    returnSecureToken?: boolean
    email: string
    password: string
}

export interface FbAuthResponse {
    idToken: string
    expiresIn: string
}