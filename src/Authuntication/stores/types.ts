export interface siginRequestobject{
    username:string
    password:string
}
export interface signinResponse{
    access_token: string,
    user_type: string
}
export interface signoutRequestobject{
    access_token: string
}
export interface signoutResponse{
    sign_out: string
 }