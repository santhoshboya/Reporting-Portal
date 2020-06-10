import getObservationsResponse from '../../fixtures/getObservationsResponse.json'
class AdminObservationFixtureService {
   listOfObservationApi(Limit, offeset, accessToken) {
      let dataCopy = getObservationsResponse.all_observations.slice()
      let data = dataCopy.splice(offeset, Limit)
      let dummyData = {
         all_observations: data,
         total_observations_count:
            getObservationsResponse.total_observations_count,
         user_type: getObservationsResponse.user_type
      }
      return new Promise(resolve => setTimeout(() => resolve(dummyData), 1000))
   }
}

export { AdminObservationFixtureService }
