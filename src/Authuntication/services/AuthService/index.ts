import { siginRequestobject, signinResponse, signoutResponse } from "../../stores/types";

export interface SigninService{
    signInAPI:(request:siginRequestobject)=>Promise<signinResponse>
    signoutAPI:()=>Promise<signoutResponse>
}