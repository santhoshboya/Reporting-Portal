import React, { Component } from 'react'
import { observable, action } from 'mobx';
import { API_INITIAL } from "@ib/api-constants";
import { UserStore } from '../../../UserModule/stores/UserStore';

import { ObservationFixtureService } from '../../services/ObservationFixtureService/ObservationFixtureService'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise';
class RpStore extends UserStore {
    @observable userType
    @observable updateObservationAPIStatus;
    @observable updateObservationAPIError;
    @observable rpObservationAPIService;
    @observable assignedObservationListForRp;
    constructor(observationFixtureService) {
        super(observationFixtureService)
        this.init();
        this.rpObservationAPIService = observationFixtureService;
    }

    init = () => {
        this.updateObservationAPIStatus = API_INITIAL;
        this.updateObservationAPIError = null;
        this.assignedObservationListForRp = [];
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





}
export { RpStore };
