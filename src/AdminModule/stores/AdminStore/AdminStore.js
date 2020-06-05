import React, { Component } from 'react'
import { AdminObsevationModel } from '../Models/AdminObsevationModel'
import { observable, action, computed, toJS } from 'mobx'
import { API_INITIAL } from "@ib/api-constants";
import { inject } from 'mobx-react';
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise';
import { RpStore } from '../../../RpModule/stores/RpStore';
const ALL = "all"
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
    @observable statusFilterOfList;


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
        this.statusFilterOfList = ALL;

    }

    @action.bound
    getAdminObservationList() {


        console.log(111111111111111111111111111111, this.getCategoryAndSubCategoryId()[0], this.getCategoryAndSubCategoryId()[1]);

        let details = {
            "sort_on": this.observationsSortType,
            "sort_by": this.observationsSortOption,
            "filter_on": this.statusFilterOfList,
            "categories": this.getCategoryAndSubCategoryId()[0],
            "sub_categories": this.getCategoryAndSubCategoryId()[1]
        };
        console.log("details>>>>>>>", this.observationsSortType, this.observationsSortOption, this.getCategoryAndSubCategoryId());
        let offset = Math.ceil(LIMIT * (this.listOfObservationsCurrentPage - 1))
        const adminObservationPromise = this.adminObservationAPIService.listOfObservationApi(LIMIT, offset, details);
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
        this.listOfObservationsTotalPages = Math.ceil(adminObservationListResponse.total_observations_count / LIMIT);
        this.adminObservationsList = adminObservationListResponse.all_observations.map(observation => new AdminObsevationModel(observation))
        this.userType = adminObservationListResponse.user_type;

    }
    @action.bound
    filterCategory(value) {
        this.categotyFilterType = value;
        this.getCategoryAndSubCategoryId()
        this.getAdminObservationList();
    }
    @action.bound
    filterSubCategory(value) {
        this.subCategotyFilterType = value;
        this.getCategoryAndSubCategoryId()
        this.getAdminObservationList();
    }
    @action.bound
    setStatusFilterOfList = (value) => {
        this.statusFilterOfList = value.value;
        this.getAdminObservationList();
    }



    @computed get getSubCateogariesMultiple() {
        let categories = [];
        if (this.categotyFilterType) {
            (this.categotyFilterType).forEach(category => categories.push(category.value))
            let subCategories = [];
            this.cateogaries.forEach(category => {
                if (categories.includes(category.name)) {
                    subCategories.push(...category.sub_categories)
                }
            })
            let temp = [];
            toJS(subCategories).forEach(category => temp.push(category.name))
            return temp;
        }
        return [];
    }



    getCategoryAndSubCategoryId = () => {


        let categories_ids = [];
        this.categotyFilterType.forEach(cateogary => {
            this.cateogaries.forEach(cateogary2 => {
                if (cateogary.value == cateogary2.name)
                    categories_ids.push(cateogary2.category_id)
            })
        })
        let sub_category_ids = [];
        this.subCategotyFilterType.forEach(subCategory => {
            this.cateogaries.forEach(cateogary => {
                cateogary.sub_categories.forEach(subCategory2 => {
                    if (subCategory2.name === subCategory.value) {
                        console.log("ddddddddddddddddddddd", subCategory2, subCategory);

                        sub_category_ids.push(subCategory2.sub_category_id)
                    }
                })
            })
        })
        return [categories_ids, sub_category_ids]

        console.log(2222222222222222222222, categories_ids, sub_category_ids, this.subCategotyFilterType);


        // const { cateogaries } = this.props.userStore
        // let category_id;
        // let sub_category_id;
        // if (cateogaries.length > 1) {
        //     let temp = cateogaries.find(cateogary => cateogary.name === this.cateogary)
        //     if (temp)
        //         category_id = temp.category_id
        //     else
        //         return [0, 0]



        //     cateogaries.forEach(cateogary => {
        //         if (cateogary.name === this.cateogary) {
        //             sub_category_id = cateogary.sub_categories.find(subCateogary => subCateogary.name === this.subCateogary).sub_category_id
        //             console.log(cateogary, 999999999999999);

        //         }
        //     })
        //     return [category_id, sub_category_id]
        // }
        // return [0, 0]
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
