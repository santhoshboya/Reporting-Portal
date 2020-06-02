import { observable, action, computed, toJS } from "mobx"
import { API_INITIAL } from "@ib/api-constants";
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import { Observation } from "../Models/Observation";
const LIMIT = 3;
const SORT_OPTIONS = ["NEW", "OLD"]
const SORT_KEYS = ['dueDate', 'reportedOn']
const SORT_KEY = "reportedOn";
const FILTER_TYPE = "ALL";
class UserStore {

    @observable userType;
    @observable observationList;
    @observable observation;
    @observable observationDetails;
    @observable getObservationListAPIStatus;
    @observable getObservationListAPIError;
    @observable userObservationAPIService;

    @observable getObservationAPIStatus;
    @observable getObservationAPIError;

    @observable getPostObservationAPIStatus;
    @observable getPostObservationAPIError;

    @observable observationsSortType;
    @observable observationsSortOption;
    @observable reportedOnSortType;
    @observable dueDateSortType;
    @observable filtersOfObservation;

    @observable currentPage;
    @observable totalPages;
    @observable filterType;
    @observable sortType;
    @observable cateogary;
    @observable cateogaries;
    @observable subCateogaries;


    constructor(userObservationAPIService) {
        this.init();
        this.userObservationAPIService = userObservationAPIService;

    }
    @action.bound
    init() {
        this.getObservationListAPIStatus = API_INITIAL;
        this.getObservationListAPIError = null;

        this.getObservationAPIStatus = API_INITIAL;
        this.getObservationAPIError = null;

        this.getPostObservationAPIStatus = API_INITIAL;
        this.getPostObservationAPIError = null;

        this.getCateogariesAPIStatus = API_INITIAL;
        this.getCateogariesAPIError = null;

        this.observationDetails = {};
        this.observationList = [];
        this.observation = {};
        this.currentPage = 1;
        this.totalPages = null;
        this.userType = "";
        this.filterType = "ALL";
        this.observationsSortOption = SORT_OPTIONS[0];
        this.reportedOnSortType = SORT_OPTIONS[0];
        this.dueDateSortType = SORT_OPTIONS[0];
        this.observationsSortType = SORT_KEY;
        this.cateogaries = [];
        this.subCateogaries = [];
    }

    @action.bound
    getCateogaries(requestObject, onSuccess, onFailure) {
        const categoriesPromise = this.userObservationAPIService.getCateogariesApi(requestObject)
        return bindPromiseWithOnSuccess(categoriesPromise)
            .to(this.setGetCateogariesApiAPIStatus, response => {
                this.setGetCateogariesApiResponse(response)
                onSuccess()
            })
            .catch(error => {
                this.setGetCateogariesApiAPIError(error)
                onFailure();
            })
    }


    @action.bound
    setGetCateogariesApiAPIStatus(apiStatus) {
        this.getCateogariesAPIStatus = apiStatus;
    }

    @action.bound
    setGetCateogariesApiAPIError(error) {
        this.getCateogariesAPIError = error;
    }

    @action.bound
    setGetCateogariesApiResponse(response) {
        this.cateogaries = response.cateogaries;
        this.cateogary = this.cateogaries[0].name
        this.subCateogaries = response.subCateogaries;
        console.log(this.cateogaries, this.subCateogaries)

    }
    @computed get cateogariesList() {
        let temp = []
        this.cateogaries.forEach((cateogary) => {
            temp.push(cateogary.name)
        })
        return temp;
    }
    @computed get getSubCateogaries() {
        let subCateogaries;
        if (this.cateogaries.length > 0)
            subCateogaries = this.subCateogaries.find(cateogary => cateogary.cateogary === this.cateogary).subCateogaries
        else
            subCateogaries = [];

        let temp = []
        subCateogaries.forEach((subCateogary) => {
            temp.push(subCateogary.name)
        })
        return temp;
    }



    @action.bound
    getObservationList() {
        let offset = Math.ceil(LIMIT * (this.currentPage - 1))
        let accessToken = "";
        const userObservationPromise = this.userObservationAPIService.getObservationListApi(LIMIT, offset, accessToken);
        return bindPromiseWithOnSuccess(userObservationPromise)
            .to(this.setGetObservationListApiAPIStatus, this.setGetObservationListApiResponse)
            .catch(this.setGetObservationListApiAPIError);

    }


    @action.bound
    setGetObservationListApiAPIStatus(apiStatus) {
        this.getObservationListAPIStatus = apiStatus;
    }

    @action.bound
    setGetObservationListApiAPIError(error) {
        console.log(error)
        this.getObservationListAPIError = error;
    }

    @action.bound
    setGetObservationListApiResponse(ObservationListResponse) {
        this.totalPages = Math.ceil(ObservationListResponse.total_No_Of_Observation / LIMIT);
        this.observationList = ObservationListResponse.observation_list.map(observation => new Observation(observation))
        this.userType = ObservationListResponse.user_type;
    }


    @action.bound
    getObservation(requestObject, onSuccess, onFailure) {
        const observationPromise = this.userObservationAPIService.getObservationApi(requestObject)
        return bindPromiseWithOnSuccess(observationPromise)
            .to(this.setGetObservationApiAPIStatus, response => {
                this.setGetObservationApiResponse(response)
                onSuccess()
            })
            .catch(error => {
                this.setGetObservationApiAPIError(error)
                onFailure();
            })
    }


    @action.bound
    setGetObservationApiAPIStatus(apiStatus) {
        this.getObservationAPIStatus = apiStatus;
    }

    @action.bound
    setGetObservationApiAPIError(error) {
        this.getObservationAPIError = error;
    }

    @action.bound
    setGetObservationApiResponse(ObservationResponse) {
        this.observationDetails = ObservationResponse;
        this.userType = ObservationResponse.user_type;

    }

    @action.bound
    addNewObservation(requestObject, onSuccess, onFailure) {
        const postObservationPromise = this.userObservationAPIService.postObservationApi(requestObject)
        return bindPromiseWithOnSuccess(postObservationPromise)
            .to(this.setPostObservationApiAPIStatus, response => {
                this.setPostObservationApiResponse(response)
                onSuccess()
            })
            .catch(error => {
                this.setPostObservationApiAPIError(error)
                onFailure()
            })
    }

    @action.bound
    setPostObservationApiAPIStatus(apiStatus) {
        this.getPostObservationAPIStatus = apiStatus;
    }

    @action.bound
    setPostObservationApiAPIError(error) {
        this.getPostObservationAPIError = error;
    }

    @action.bound
    setPostObservationApiResponse(postObservationResponse) {
        this.observation = postObservationResponse;
    }



    @action.bound
    filterObservationList(event) {
        this.filterType = event.target.value;
    }

    @action.bound
    goToPreviousPage() {
        this.currentPage--;
        console.log(1, this.currentPage)
        this.getObservationList()
    }

    @action.bound
    goToNextPage() {
        this.currentPage++;
        this.getObservationList();
        console.log(2, this.currentPage)
    }

    @action.bound
    goToRandomPage(value) {
        this.currentPage = parseInt(value, 10);
        this.getObservationList();
        console.log(3, this.currentPage)
    }

    @action.bound
    reportedOnSort() {
        if (this.reportedOnSortType === SORT_OPTIONS[0])
            this.reportedOnSortType = SORT_OPTIONS[1];
        else
            this.reportedOnSortType = SORT_OPTIONS[0];
        this.observationsSortType = SORT_KEYS[1]
        this.observationsSortOption = this.reportedOnSortType;
        this.getObservationList();
    }
    @action.bound
    dueDateOnSort() {
        if (this.dueDateSortType === SORT_OPTIONS[0])
            this.dueDateSortType = SORT_OPTIONS[1];
        else
            this.dueDateSortType = SORT_OPTIONS[0];
        this.observationsSortType = SORT_KEYS[0]
        this.observationsSortOption = this.dueDateSortType;
        this.getObservationList();
    }
}
export { UserStore };