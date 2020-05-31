import React, { Component } from 'react'
import { observable, action } from 'mobx';
import { API_INITIAL } from "@ib/api-constants";
import { UserStore } from '../../../UserModule/stores/UserStore';
import { ObservationFixtureService } from '../../../UserModule/services/ObservationFixtureService/ObservationFixtureService'

import { bindPromiseWithOnSuccess } from '@ib/mobx-promise';
import { RpModel } from '../Models/RpModel';
const SORT_TYPE = ["NEW", "OLD"];
const LIMIT = 7;
class RpStore {
    @observable userType
    @observable reportedOnSortType;
    @observable dueDateSortType;
    @observable updateObservationAPIStatus;
    @observable updateObservationAPIError;
    @observable assignedObservationAPIStatus;
    @observable assignedObservationAPIError;
    @observable rpObservationAPIService;
    @observable assignedObservationListForRp;
    @observable userStore;
    @observable assignedObservationsCurrentPage;
    @observable assignedObservationsTotalPages
    constructor(observationFixtureService) {
        this.init();
        this.rpObservationAPIService = observationFixtureService;
    }

    init = () => {
        this.userStore = new UserStore(new ObservationFixtureService)
        this.updateObservationAPIStatus = API_INITIAL;
        this.updateObservationAPIError = null;
        this.assignedObservationAPIStatus = API_INITIAL;
        this.assignedObservationAPIError = null;
        this.assignedObservationListForRp = [];
        this.reportedOnSortType = SORT_TYPE[0];
        this.dueDateSortType = SORT_TYPE[0];
        this.assignedObservationsCurrentPage = 0;
    }


    @action.bound
    getAssignedObservationList() {
        let offset = Math.ceil(LIMIT * (this.currentPage - 1))
        let accessToken = "";
        const userObservationPromise = this.rpObservationAPIService.getAssignedObservationListApi(LIMIT, offset, accessToken);
        return bindPromiseWithOnSuccess(userObservationPromise)
            .to(this.setAssignedObservationListApiAPIStatus, this.setAssignedObservationListApiResponse)
            .catch(this.setAssignedObservationListApiAPIError);

    }

    @action.bound
    setAssignedObservationListApiAPIStatus(apiStatus) {
        this.assignedObservationAPIStatus = apiStatus;
    }

    @action.bound
    setAssignedObservationListApiAPIError(error) {
        this.assignedObservationAPIError = error;
    }

    @action.bound
    setAssignedObservationListApiResponse(assignedObservationListResponse) {
        this.assignedObservationsTotalPages = Math.ceil(assignedObservationListResponse.total_No_Of_Observation / LIMIT);
        this.assignedObservationListForRp = assignedObservationListResponse.observation_list.map(observation => new RpModel(observation))
        this.userType = assignedObservationListResponse.user_type;
    }


    @action.bound
    updateObservationDeatails(id, details) {
        const updateObservationApiPromise = this.rpObservationAPIService.updateObservationApi(id, details)
        return new bindPromiseWithOnSuccess(updateObservationApiPromise)
            .to(this.setUpdateObservationApiAPIStatus, this.setUpdateObservationApiResponse)
            .catch(this.setUpdateObservationApiAPIError);
    }

    @action.bound
    setUpdateObservationApiAPIStatus(apiStatus) {
        this.updateObservationAPIStatus = apiStatus;
    }
    @action.bound
    setUpdateObservationApiResponse(response) {
        console.log(response);
    }
    @action.bound
    setUpdateObservationApiAPIError(error) {
        this.updateObservationAPIError = error;
    }
    @action.bound
    reportedOnSort() {
        if (this.reportedOnSortType === SORT_TYPE[0])
            this.reportedOnSortType = SORT_TYPE[1];
        else
            this.reportedOnSortType = SORT_TYPE[0];
    }
    @action.bound
    dueDateOnSort() {
        if (this.dueDateSortType === SORT_TYPE[0])
            this.dueDateSortType = SORT_TYPE[1];
        else
            this.dueDateSortType = SORT_TYPE[0];
    }


    @action.bound
    goToPreviousPage() {
        this.assignedObservationsCurrentPage--;
        this.getAssignedObservationList()
    }
    @action.bound
    goToNextPage() {
        this.assignedObservationsCurrentPage++;
        this.getAssignedObservationList();
    }
    @action.bound
    goToRandomPage(event) {
        this.assignedObservationsCurrentPage = parseInt(event.target.value, 10);
        this.getAssignedObservationList();
    }
}
export { RpStore };
