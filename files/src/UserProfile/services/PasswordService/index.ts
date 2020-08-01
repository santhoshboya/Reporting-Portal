import {
   ForgotPasswordAPIRequestObjectType,
   UpdatePasswordAPIRequestObjectType
} from '../../stores/types'

export interface PasswordService {
   sendResetPasswordLinkAPI: (
      requestObject: ForgotPasswordAPIRequestObjectType
   ) => // FIXME: Remove "any" type & Resolve the issue in PasswordAPI from networkCallWithApisauce
   Promise<{} | any>

   updatePasswordAPI: (
      requestObject: UpdatePasswordAPIRequestObjectType
   ) => // FIXME: Remove "any" type & Resolve the issue in PasswordAPI from networkCallWithApisauce
   Promise<{} | any>
}
