import getObservationsResponse from '../../fixtures/getObservationsResponse.json'
class AdminObservationFixtureService {

    listOfObservationApi(Limit, offeset, accessToken) {
        let dataCopy = getObservationsResponse.observation_list.slice();
        let data = dataCopy.splice(offeset, Limit);
        let dummyData = {
            "observation_list": data,
            "total_No_Of_Observation": getObservationsResponse.total_No_Of_Observation,
            "user_type": getObservationsResponse.user_type
        }
        return new Promise(resolve => resolve(dummyData))
    }
}

export { AdminObservationFixtureService };
