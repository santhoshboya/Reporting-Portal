import { networkCallWithApisauce } from '../../utils/APIUtils'
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
            apiMethods.get
        )
    }
    getObservationListApi(Limit, offeset, accessToken) {
        let endPoint = `${endPoints.obseravationList}?limit=${Limit}&offset=${offeset}`
        return networkCallWithApisauce(
            this.api,
            endPoint,
            { accessToken },
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
    getAssignedObservationListApi(Limit, offeset, accessToken) {
        let endPoint = `${endPoints.obseravationList}?limit=${Limit}&offset=${offeset}`
        return networkCallWithApisauce(
            this.api,
            endPoint,
            { accessToken },
            apiMethods.get
        )
    }
}

export { ObservationApiService };