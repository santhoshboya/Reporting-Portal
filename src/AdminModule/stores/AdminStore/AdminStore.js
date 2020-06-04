import React, { Component } from 'react'
import { AdminObsevationModel } from '../Models/AdminObsevationModel'
import { observable, action } from 'mobx'
import { API_INITIAL } from "@ib/api-constants";
import { inject } from 'mobx-react';
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise';

const LIMIT = 3;
class AdminStore {
    @observable userType
    @observable categotyFilterType;
    @observable subCategotyFilterType;
    @observable adminObservationsListAPIStatus;
    @observable adminObservationsListAPIError;
    @observable adminObservationsList;
    @observable adminObservationAPIService;
    @observable listOfObservationsCurrentPage;
    @observable listOfObservationsTotalPages;


    constructor(adminObservationAPIService) {

        this.adminObservationAPIService = adminObservationAPIService;
        this.initAdmin();
    }

    initAdmin = () => {
        this.adminObservationsListAPIStatus = API_INITIAL;
        this.adminObservationsListAPIError = null;
        this.userType = null;
        this.adminObservationsList = [];
        this.categotyFilterType = null;
        this.subCategotyFilterType = null;
        this.listOfObservationsCurrentPage = 1;
    }

    @action.bound
    getAdminObservationList() {
        let offset = Math.ceil(LIMIT * (this.listOfObservationsCurrentPage - 1))
        let accessToken = "";
        const adminObservationPromise = this.adminObservationAPIService.listOfObservationApi(LIMIT, offset, accessToken);
        return bindPromiseWithOnSuccess(adminObservationPromise)
            .to(this.setAdminObservationListApiAPIStatus, this.setAdminObservationListApiResponse)
            .catch(this.setAdminObservationListApiAPIError);
    }

    @action.bound
    setAdminObservationListApiAPIStatus(apiStatus) {
        this.adminObservationsListAPIStatus = apiStatus;
    }

    @action.bound
    setAdminObservationListApiAPIError(error) {
        this.adminObservationsListAPIError = error;
    }

    @action.bound
    setAdminObservationListApiResponse(adminObservationListResponse) {
        this.listOfObservationsTotalPages = Math.ceil(adminObservationListResponse.total_No_Of_Observation / LIMIT);
        this.adminObservationsList = adminObservationListResponse.observation_list.map(observation => new AdminObsevationModel(observation))
        this.userType = adminObservationListResponse.user_type;

    }
    @action.bound
    filterCategory(value) {
        this.categotyFilterType = value;
        this.getAdminObservationList();
    }
    @action.bound
    filterSubCategory(value) {
        this.subCategotyFilterType = value;
        this.getAdminObservationList();
    }


    @action.bound
    goToPreviousObservations() {
        this.listOfObservationsCurrentPage--;
        this.getAdminObservationList()
    }

    @action.bound
    goToNextObservations() {
        this.listOfObservationsCurrentPage++;
        this.getAdminObservationList();
    }

    @action.bound
    goToRandomObservations(value) {
        this.listOfObservationsCurrentPage = parseInt(value, 10);
        this.getAdminObservationList();
    }
}
export { AdminStore }
