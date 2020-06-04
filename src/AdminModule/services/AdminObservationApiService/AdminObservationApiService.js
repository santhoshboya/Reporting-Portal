import { networkCallWithApisauce } from "../../../common/utils/APIUtils";
import { create } from "apisauce";
import { apiMethods, apiUrls } from '../../constants/APIConstants';
import { endPoints } from '../EndPoints'
class AdminObservationApiService {
    api;
    constructor() {
        this.api = create({
            baseURL: apiUrls.obseravation
        })
    }

    listOfObservationApi(requestObject) {
        return networkCallWithApisauce(
            this.api,
            endPoints.listofObservations,
            { requestObject },
            apiMethods.get
        )
    }
}
export { AdminObservationApiService }
