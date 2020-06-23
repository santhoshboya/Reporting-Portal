import { networkCallWithApisauce } from '../../../common/utils/APIUtils'
import { create } from 'apisauce'
import { apiMethods, apiUrls } from '../../constants/APIConstants'
import { endPoints } from '../Endpoints'
class AdminObservationApiService {
   api
   constructor() {
      this.api = create({
         baseURL: apiUrls.admin
      })
   }

   listOfObservationApi(Limit, offeset, details) {
      let endPoint = `${endPoints.listofObservations}?limit=${Limit}&offset=${offeset}`
      return networkCallWithApisauce(
         this.api,
         endPoint,
         details,
         apiMethods.post
      )
   }
}
export { AdminObservationApiService }
