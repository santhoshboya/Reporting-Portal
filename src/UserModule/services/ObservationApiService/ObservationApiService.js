import { networkCallWithApisauce } from '../../../common/utils/APIUtils'
import { create } from "apisauce";
import { apiMethods, apiUrls } from '../../constants/APIConstants';
import { endPoints } from '../EndPoints'
import getObservationsList from '../../fixtures/getObservationsResponse.json'
import getObservation from '../../fixtures/getObservationResponse.json'
class ObservationApiService {
    api;
    constructor() {
        this.api = create({
            baseURL: apiUrls.obseravation
        })
    }
    getObservationApi(requestObject) {
        return networkCallWithApisauce(
            this.api,
            endPoints.observation,
            { requestObject },
            apiMethods.get
        )
    }
    postObservationApi(obseravation) {
        console.log("post api observation submitted...", obseravation);
        return networkCallWithApisauce(
            this.api,
            endPoints.postObservation,
            { obseravation },
            apiMethods.post
        )
    }
    getObservationListApi(Limit, offeset, details) {
        let endPoint = `${endPoints.observationList}?limit=${Limit}&offset=${offeset}`
        console.log(12345, details);

        return networkCallWithApisauce(
            this.api,
            endPoint,
            details,
            apiMethods.post
        )
    }
    getCateogariesApi() {
        let endPoint = `catagories`
        return networkCallWithApisauce(
            this.api,
            endPoint,
            {},
            apiMethods.get
        )
    }
    updateObservationApi(id, Details) {
        return networkCallWithApisauce(
            this.api,
            endPoint,
            { id, Details },
            apiMethods.get
        )
    }
}

export { ObservationApiService };