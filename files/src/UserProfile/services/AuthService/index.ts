import {
   LoginAPIRequestObjectType,
   LoginAPIResponseObjectType
} from '../../stores/types'

export interface AuthService {
   getLoginAPI: (
      requestObject: LoginAPIRequestObjectType
   ) => // FIXME: Remove "any" type & Resolve the issue in AuthAPI from networkCallWithApisauce
   Promise<LoginAPIResponseObjectType | any>
}
