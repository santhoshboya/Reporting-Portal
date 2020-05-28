import {observable,action,computed,toJS} from "mobx"
import { API_INITIAL} from "@ib/api-constants";
import {bindPromiseWithOnSuccess} from '@ib/mobx-promise'
import { Observation } from "../Models/Observation";
const LIMIT=3;

class UserStore{
    @observable observationList;
    @observable getObservationListAPIStatus;
    @observable getObservationListAPIError;
    @observable observationListAPIService;
    @observable currentPage;
    @observable totalPages;

    constructor(observationListAPIService){
        console.log("userstore")
        this.init();
        this.observationListAPIService=observationListAPIService;
        
    }
    @action.bound
    init(){
        this.getObservationListAPIStatus=API_INITIAL;
        this.getObservationListAPIError=null;
        this.observationList=[];
        this.currentPage=1;
        this.totalPages=null;
    }

    @action.bound
    getObservationList(){
        let offset=Math.ceil(LIMIT*(this.currentPage-1))
        let accessToken="";
        const observationListPromise=this.observationListAPIService.getObservationListApi(LIMIT,offset,accessToken);
        return bindPromiseWithOnSuccess(observationListPromise)
        .to(this.setGetObservationListApiAPIStatus,this.setGetObservationListApiResponse)
        .catch(this.setGetObservationListApiAPIError);
    }

    @action.bound
    setGetObservationListApiAPIStatus(apiStatus){
        this.getObservationListAPIStatus=apiStatus;
    }

    @action.bound
    setGetObservationListApiAPIError(error){
        this.getObservationListAPIError=error;
    }

    @action.bound
    setGetObservationListApiResponse(ObservationListResponse){
        this.observationList=ObservationListResponse.observation_list.map(observation=>new Observation(observation))
        this.totalPages= Math.ceil(ObservationListResponse.total_No_Of_Observation/LIMIT);
       
    }
    @action.bound
    goToPreviousPage(){
        this.currentPage--;
        this.getObservationList()
    }

    @action.bound
    goToNextPage(){
        this.currentPage++;
        this.getObservationList();
    }
}
export {UserStore};