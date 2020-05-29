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
        return new Promise(resolve => resolve(getObservationsList))
    }
}

export { ObservationFixtureService };
