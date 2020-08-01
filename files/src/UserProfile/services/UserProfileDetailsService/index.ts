import { UserProfileDetailsAPIResponseObjectType } from '../../stores/types'

export interface UserProfileDetailsService {
   // FIXME: Remove "any" type & Resolve the issue in AuthAPI from networkCallWithApisauce
   getUserProfileDetailsAPI: () => Promise<
      UserProfileDetailsAPIResponseObjectType | any
   >
   // FIXME: Remove "any" type & Resolve the issue in AuthAPI from networkCallWithApisauce
   getLogoutAPI: () => Promise<{} | any>
}
