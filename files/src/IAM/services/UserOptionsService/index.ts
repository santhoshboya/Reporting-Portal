import { GetUserOptionsApiResponse } from '../../stores/types'

interface UserOptionsService {
   getUserOptions: () => Promise<GetUserOptionsApiResponse>
}

export default UserOptionsService
