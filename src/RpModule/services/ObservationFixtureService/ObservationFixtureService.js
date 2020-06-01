import getAssignedObservationsResponse from '../../fixtures/getAssignedObservationsResponse.json'
class ObservationFixtureService {

    updateObservationApi(id, Details) {
        console.log("observation updated...", Details);
        return new Promise(resolve => resolve())
    }
    getAssignedObservationListApi(Limit, offeset, accessToken) {
        console.log(Limit, offeset);

        let dataCopy = getAssignedObservationsResponse.observation_list.slice();
        let data = dataCopy.splice(offeset, Limit);
        let dummyData = {
            "observation_list": data,
            "total_No_Of_Observation": getAssignedObservationsResponse.total_No_Of_Observation,
            "user_type": getAssignedObservationsResponse.user_type
        }
        return new Promise(resolve => resolve(dummyData))
    }
}

export { ObservationFixtureService };
