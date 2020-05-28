import {networkCallWithApisauce} from '../../utils/APIUtils'
import { create } from "apisauce";
import {apiMethods,apiUrls} from '../../constants/APIConstants';
import {endPoints} from '../EndPoints'
class PostNewObservationApi{
    api;
    constructor(){
        this.api=create({
            baseURL:apiUrls.obseravation
        })
    }
    postObservationApi(obseravation){
        console.log("post api observation submitted...",obseravation);
        return networkCallWithApisauce(
            this.api,
            endPoints.postObservation,
            {obseravation},
            apiMethods.get
        )
    }
}

export {PostNewObservationApi};