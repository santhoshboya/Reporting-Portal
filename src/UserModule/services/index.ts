import { getObservationApiRequestObject, getObservationApiResponce, postObservationApiRequestObject,
     getObservationListApiRequestObject, getObservationListApiResponce, getCateogariesApiResponce, updateObservationDeatailsRequestObject } from "../stores/types";

export interface UserService{
    getObservationApi:(request:getObservationApiRequestObject)=>Promise<getObservationApiResponce>
    postObservationApi:(request:postObservationApiRequestObject)=>void
    getObservationListApi:(...getObservationListApiRequestObject)=>Promise<getObservationListApiResponce>
    getCateogariesApi:()=>Promise<getCateogariesApiResponce>
    updateObservationApi:(...updateObservationDeatailsRequestObject)=>void


}