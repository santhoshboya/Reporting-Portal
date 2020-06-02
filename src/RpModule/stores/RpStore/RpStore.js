import React, { Component } from 'react'
import { observable, action } from 'mobx';
import { API_INITIAL } from "@ib/api-constants";
import { UserStore } from '../../../UserModule/stores/UserStore';
import { ObservationFixtureService } from '../../../UserModule/services/ObservationFixtureService/ObservationFixtureService'

import { bindPromiseWithOnSuccess } from '@ib/mobx-promise';
import { RpModel } from '../Models/RpModel';
const SORT_OPTIONS = ["NEW", "OLD"]
const SORT_KEYS = ['dueDate', 'reportedOn']
const SORT_KEY = "reportedOn";
const FILTER_TYPE = "ALL";
const LIMIT = 3;
class RpStore extends UserStore {
    @observable userType
    @observable assignedObservationsSortType;
    @observable assignedObservationsSortOption;
    @observable assignedObservationReportedOnSortType;
    @observable assignedObservationDueDateSortType;
    @observable updateObservationAPIStatus;
    @observable updateObservationAPIError;
    @observable assignedObservationAPIStatus;
    @observable assignedObservationAPIError;
    @observable rpObservationAPIService;
    @observable assignedObservationListForRp;
    @observable assignedObservationsCurrentPage;
    @observable assignedObservationsTotalPages
    @observable filterTypeOfAssignedObservation;

    constructor(rpObservationFixtureService, observationFixtureService) {
        super(observationFixtureService);
        this.rpStoreInit();
        this.rpObservationAPIService = rpObservationFixtureService;

    }

    rpStoreInit = () => {
        this.updateObservationAPIStatus = API_INITIAL;
        this.updateObservationAPIError = null;
        this.assignedObservationAPIStatus = API_INITIAL;
        this.assignedObservationAPIError = null;
        this.assignedObservationListForRp = [];
        this.assignedObservationsSortType = SORT_KEY;
        this.assignedObservationsCurrentPage = 1;
        this.filterTypeOfAssignedObservation = FILTER_TYPE;
        this.assignedObservationsSortOption = SORT_OPTIONS[0];
        this.assignedObservationReportedOnSortType = SORT_OPTIONS[0];
        this.assignedObservationDueDateSortType = SORT_OPTIONS[0];

    }


    @action.bound
    getAssignedObservationList() {
        let offset = Math.ceil(LIMIT * (this.assignedObservationsCurrentPage - 1))
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
    updateObservationDeatails(details) {
        const updateObservationApiPromise = this.rpObservationAPIService.updateObservationApi(details)
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
    assignedObservationsReportedOnSort() {
        if (this.assignedObservationReportedOnSortType === SORT_OPTIONS[0])
            this.assignedObservationReportedOnSortType = SORT_OPTIONS[1];
        else
            this.assignedObservationReportedOnSortType = SORT_OPTIONS[0];
        this.assignedObservationsSortType = SORT_KEYS[1]
        this.assignedObservationsSortOption = this.assignedObservationReportedOnSortType;
        this.getAssignedObservationList();
    }
    @action.bound
    assignedObservationsDueDateOnSort() {
        if (this.assignedObservationDueDateSortType === SORT_OPTIONS[0])
            this.assignedObservationDueDateSortType = SORT_OPTIONS[1];
        else
            this.assignedObservationDueDateSortType = SORT_OPTIONS[0];
        this.assignedObservationsSortType = SORT_KEYS[0]
        this.assignedObservationsSortOption = this.assignedObservationDueDateSortType;
        this.getAssignedObservationList();


    }


    @action.bound
    assignedObservationsGoToPreviousPage() {
        this.assignedObservationsCurrentPage--;
        this.getAssignedObservationList();
    }
    @action.bound
    assignedObservationsGoToNextPage() {
        this.assignedObservationsCurrentPage++;
        this.getAssignedObservationList();
    }
    @action.bound
    assignedObservationsGoToRandomPage(value) {
        this.assignedObservationsCurrentPage = parseInt(value, 10);
        this.getAssignedObservationList();
    }
    @action.bound
    filterAssignedObservationList(event) {
        this.filterTypeOfAssignedObservation = event.target.value;
        this.getAssignedObservationList();
    }
}
export { RpStore };
