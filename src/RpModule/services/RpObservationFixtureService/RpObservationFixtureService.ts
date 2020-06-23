import getAssignedObservationsResponse from '../../fixtures/getAssignedObservationsResponse.json'
class RpObservationFixtureService {
   // updateObservationApi(id, Details) {
   //    console.log('observation updated...', Details)
   //    return new Promise(resolve => setTimeout(resolve('Updated'), 1000))
   // }
   getAssignedObservationListApi(Limit, offeset, accessToken) {
      let dataCopy = getAssignedObservationsResponse.observations_assigned_to_rp.slice()
      let data = dataCopy.splice(offeset, Limit)
      let dummyData = {
         observations_assigned_to_rp: data,
         total_observations_count:
            getAssignedObservationsResponse.total_observations_count,
         user_type: getAssignedObservationsResponse.user_type
      }
      return new Promise(resolve => setTimeout(() => resolve(dummyData), 1000))
   }
}

export { RpObservationFixtureService }
