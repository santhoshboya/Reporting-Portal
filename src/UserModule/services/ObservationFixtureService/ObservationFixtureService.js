import { networkCallWithApisauce } from '../../utils/APIUtils'
import { create } from 'apisauce'
import getObservationsList from '../../fixtures/getObservationsResponse.json'
import getObservation from '../../fixtures/getObservationResponse.json'
import getCateogaries from '../../fixtures/getCateogariesNew.json'
///changed
class ObservationFixtureService {
   getObservationApi(requestObject) {
      return new Promise(resolve =>
         setTimeout(() => resolve(getObservation), 1000)
      )
   }
   postObservationApi(obseravation) {
      console.log('post api observation submitted...', obseravation)
      return new Promise(resolve => resolve())
   }
   getObservationListApi(Limit, offeset, accessToken) {
      let dataCopy = getObservationsList.observation_list.slice()
      let data = dataCopy.splice(offeset, Limit)
      let dummyData = {
         user_observations: data,
         user_observations_count: getObservationsList.user_observations_count,
         user_type: getObservationsList.user_type
      }
      console.log(555555555555555, dummyData)

      return new Promise(resolve => setTimeout(() => resolve(dummyData), 1000))
   }
   getCateogariesApi() {
      return new Promise(resolve => resolve(getCateogaries))
   }
   updateObservationApi(id, Details) {
      console.log('observation updated...', Details)
      return new Promise(resolve => setTimeout(() => resolve('Updated'), 1000))
   }
}

export { ObservationFixtureService }
