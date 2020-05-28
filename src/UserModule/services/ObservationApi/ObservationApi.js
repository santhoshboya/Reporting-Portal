import {networkCallWithApisauce} from '../../utils/APIUtils'
import { create } from "apisauce";
import {apiMethods,apiUrls} from '../../constants/APIConstants';
import {endPoints} from '../EndPoints'
class ObservationApi{
    api;
    constructor(){
        this.api=create({
            baseURL:apiUrls.obseravation
        })
    }
    getObservationApi(accessToken){
        return networkCallWithApisauce(
            this.api,
            endPoints.observation,
            {accessToken},
            apiMethods.get
        )
    }
}

export {ObservationApi};