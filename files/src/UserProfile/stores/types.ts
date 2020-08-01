export interface LoginAPIRequestObjectType {
   email: string
   password: string
}

export interface LoginAPIResponseObjectType {
   access_token: string
   refresh_token: string
   expires_in_seconds: number
}

export interface ForgotPasswordAPIRequestObjectType {
   email: string
}

export interface UpdatePasswordAPIRequestObjectType {
   password: string
   token: string
}

export interface UserProfileDetailsAPIResponseObjectType {
   user_id: string
   name: string
   profile_pic_url: string
   is_admin: boolean
}
