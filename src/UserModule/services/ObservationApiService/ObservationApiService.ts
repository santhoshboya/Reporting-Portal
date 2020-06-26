import { networkCallWithApisauce } from '../../../common/utils/APIUtils'
import { create } from 'apisauce'
import { apiMethods, apiUrls } from '../../constants/APIConstants'
import { endPoints } from '../EndPoints'
import { UserService } from ".."
class ObservationApiService {
   api
   constructor() {
      this.api = create({
         baseURL: apiUrls.obseravation
      })
   }
   getObservationApi(observation_id) {
      let endPoint = `/get/${observation_id}/observation/v1/`
      return networkCallWithApisauce(this.api, endPoint, {}, apiMethods.get)
   }
   postObservationApi(obseravation) {
      return networkCallWithApisauce(
         this.api,
         endPoints.postObservation,
         obseravation,
         apiMethods.post
      )
   }
   getObservationListApi(Limit, offeset, details) {
      let endPoint = `${endPoints.observationList}?limit=${Limit}&offset=${offeset}`

      return networkCallWithApisauce(
         this.api,
         endPoint,
         details,
         apiMethods.post
      )
   }
   getCateogariesApi() {
      return networkCallWithApisauce(
         this.api,
         endPoints.categories,
         {},
         apiMethods.get
      )
   }
   updateObservationApi(userType, Details) {
      if (userType === 'Rp')
         return networkCallWithApisauce(
            this.api,
            endPoints.updateObservationByRp,
            Details,
            apiMethods.post
         )
      else {
         return networkCallWithApisauce(
            this.api,
            endPoints.updateObservationByAdmin,
            Details,
            apiMethods.post
         )
      }
   }
}

export { ObservationApiService }
