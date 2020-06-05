import React, { Component } from 'react'
import { AdminObsevationModel } from '../Models/AdminObsevationModel'
import { observable, action, computed, toJS } from 'mobx'
import { API_INITIAL } from "@ib/api-constants";
import { inject } from 'mobx-react';
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise';
import { RpStore } from '../../../RpModule/stores/RpStore';
import { loadOptions } from '@babel/core';

const LIMIT = 3;
class AdminStore extends RpStore {
    @observable userType
    @observable categotyFilterType;
    @observable subCategotyFilterType;
    @observable adminObservationsListAPIStatus;
    @observable adminObservationsListAPIError;
    @observable adminObservationsList;
    @observable adminObservationAPIService;
    @observable listOfObservationsCurrentPage;
    @observable listOfObservationsTotalPages;


    constructor(adminObservationAPIService, rpObservationFixtureService, observationFixtureService) {
        super(rpObservationFixtureService, observationFixtureService)
        this.adminObservationAPIService = adminObservationAPIService;
        this.initAdmin();
    }

    initAdmin = () => {
        this.adminObservationsListAPIStatus = API_INITIAL;
        this.adminObservationsListAPIError = null;
        this.userType = null;
        this.adminObservationsList = [];
        this.categotyFilterType = [];
        this.subCategotyFilterType = [];
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


    @computed get getSubCateogariesMultiple() {
        let categories = [];
        (this.categotyFilterType).forEach(category => categories.push(category.value))
        let subCategories = [];
        this.cateogaries.forEach(category => {
            if (categories.includes(category.category)) {
                subCategories.push(...category.sub_catogiries)
            }
        })
        console.log(999999999, toJS(subCategories));
        let temp = [];
        toJS(subCategories).forEach(category => temp.push(category.name))
        console.log(11111111111111, temp);

        return temp;
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
