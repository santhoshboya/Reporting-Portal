import { networkCallWithApisauce } from '../../utils/APIUtils'
import { create } from "apisauce"
import getObservationsList from '../../fixtures/getObservationsResponse.json'
import getAssignedObservationsResponse from '../../fixtures/getAssignedObservationsResponse.json'
import getObservation from '../../fixtures/getObservationResponse.json'
class ObservationFixtureService {
    getObservationApi(requestObject) {
        return new Promise(resolve => resolve(getObservation))
    }
    postObservationApi(obseravation) {
        console.log("post api observation submitted...", obseravation);
        return new Promise(resolve => resolve())
    }
    getObservationListApi(Limit, offeset, accessToken) {
        let dataCopy = getObservationsList.observation_list.slice();
        let data = dataCopy.splice(offeset, Limit);
        data.push(getObservationsList.total_No_Of_Observation)
        return new Promise(resolve => resolve(data))
    }
    updateObservationApi(id, Details) {
        console.log("observation updated...", Details);
        return new Promise(resolve => resolve())
    }
    getAssignedObservationListApi(Limit, offeset, accessToken) {
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
