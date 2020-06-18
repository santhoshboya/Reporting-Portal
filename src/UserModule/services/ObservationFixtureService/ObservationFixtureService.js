import getObservationsList from '../../fixtures/getObservationsResponse.json'
import getObservation from '../../fixtures/getObservationResponse.json'
import getCateogaries from '../../fixtures/getCateogaries.json'
import getPostObservationResponse from '../../fixtures/getPostObservationResponse.json'
import getUpdateObservationResponse from '../../fixtures/getUpdateObservationResponse.json'
import { action } from '@storybook/addon-actions'
class ObservationFixtureService {
   getObservationApi(requestObject) {
      return new Promise(resolve =>
         setTimeout(() => resolve(getObservation), 1000)
      )
   }
   postObservationApi(obseravation) {
      return new Promise(resolve => resolve(getPostObservationResponse))
   }

   getObservationListApi(Limit, offeset, accessToken) {
      let dataCopy = getObservationsList.user_observations.slice()
      let data = dataCopy.splice(offeset, Limit)

      let dummyData = {
         user_observations: data,
         user_observations_count: getObservationsList.user_observations_count,
         user_type: getObservationsList.user_type
      }
      return new Promise(resolve => setTimeout(() => resolve(dummyData), 1000))
   }
   getCateogariesApi() {
      return new Promise(resolve =>
         setTimeout(() => resolve(getCateogaries), 500)
      )
   }
   updateObservationApi(id, Details) {
      return new Promise(resolve =>
         setTimeout(() => resolve(getUpdateObservationResponse), 1000)
      )
   }
}

export { ObservationFixtureService }
