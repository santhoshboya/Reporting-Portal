import {
   GetUsersResponse,
   EditUserRequestObject,
   UsersListAPIRequestObjectType,
   AddUserRequestObject,
   UserAssignedDetilsAPIResponseObject
} from '../../stores/types'

interface UserService {
   getUserList: (
      requestObject: UsersListAPIRequestObjectType
   ) => Promise<GetUsersResponse>
   postAddUserDetails: (requestObject: AddUserRequestObject) => Promise<any>
   getUserOptionsAPI: () => Promise<any>
   putEditUserDetails: (
      requestObject: EditUserRequestObject,
      userId: string
   ) => Promise<any>
   deleteUserDetailsAPI: (userId: string) => Promise<any>
}

export default UserService
