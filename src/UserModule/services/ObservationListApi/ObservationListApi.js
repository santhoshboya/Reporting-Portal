import {networkCallWithApisauce} from '../../utils/APIUtils'
import { create } from "apisauce";
import {apiMethods,apiUrls} from '../../constants/APIConstants';
import {endPoints} from '../EndPoints'
import getObservationsList from '../../fixtures/getObservationsResponse.json'
class ObservationListApi{
    api;
    constructor(){
        this.api=create({
            baseURL:apiUrls.obseravationList
        })
    }
    getObservationListApi(Limit,offeset,accessToken){
        let endPoint=`${endPoints.obseravationList}?limit=${Limit}&offset=${offeset}`
        // return networkCallWithApisauce(
        //     this.api,
        //     endPoint,
        //     {accessToken},
        //     apiMethods.get
        // )
        return new Promise(resolve=>resolve(getObservationsList))
    }
}

export {ObservationListApi};