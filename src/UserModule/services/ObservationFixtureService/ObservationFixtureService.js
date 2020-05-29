import { networkCallWithApisauce } from '../../utils/APIUtils'
import { create } from "apisauce"
import getObservationsList from '../../fixtures/getObservationsResponse.json'
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
        console.log("nk", data[Limit])
        return new Promise(resolve => resolve(data))
    }
}

export { ObservationFixtureService };