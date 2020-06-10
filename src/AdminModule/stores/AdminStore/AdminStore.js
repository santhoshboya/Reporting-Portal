import React, { Component } from 'react'
import { AdminObsevationModel } from '../Models/AdminObsevationModel'
import { observable, action, computed, toJS } from 'mobx'
import { API_INITIAL } from '@ib/api-constants'
import { inject } from 'mobx-react'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import { RpStore } from '../../../RpModule/stores/RpStore'
const ALL = 'all'
const SORT_OPTIONS = ['new', 'old']
const LIMIT = 4
const USER = 'Admin'
class AdminStore extends RpStore {
   @observable categotyFilterType
   @observable subCategotyFilterType
   @observable adminObservationsListAPIStatus
   @observable adminObservationsListAPIError
   @observable adminObservationsList
   @observable adminObservationAPIService
   @observable listOfObservationsCurrentPage
   @observable listOfObservationsTotalPages
   @observable statusFilterOfList

   constructor(
      adminObservationAPIService,
      rpObservationFixtureService,
      observationFixtureService
   ) {
      super(rpObservationFixtureService, observationFixtureService)
      this.adminObservationAPIService = adminObservationAPIService
      this.initAdmin()
   }

   initAdmin = () => {
      this.adminObservationsListAPIStatus = API_INITIAL
      this.adminObservationsListAPIError = null
      this.userType = null
      this.adminObservationsList = []
      this.categotyFilterType = []
      this.subCategotyFilterType = []
      this.listOfObservationsCurrentPage = 1
      this.statusFilterOfList = ALL
   }

   @action.bound
   getAdminObservationList() {
      let details = {
         sort_on: this.observationsSortType,
         sort_by: this.observationsSortOption,
         filter_on: this.statusFilterOfList,
         categories: this.getCategoryAndSubCategoryId()[0],
         sub_categories: this.getCategoryAndSubCategoryId()[1]
      }
      console.log(
         'details>>>>>>>',
         this.observationsSortType,
         this.observationsSortOption,
         this.getCategoryAndSubCategoryId()
      )
      let offset = Math.ceil(LIMIT * (this.listOfObservationsCurrentPage - 1))
      const adminObservationPromise = this.adminObservationAPIService.listOfObservationApi(
         LIMIT,
         offset,
         details
      )
      return bindPromiseWithOnSuccess(adminObservationPromise)
         .to(
            this.setAdminObservationListApiAPIStatus,
            this.setAdminObservationListApiResponse
         )
         .catch(this.setAdminObservationListApiAPIError)
   }

   @action.bound
   setAdminObservationListApiAPIStatus(apiStatus) {
      this.adminObservationsListAPIStatus = apiStatus
   }

   @action.bound
   setAdminObservationListApiAPIError(error) {
      this.adminObservationsListAPIError = error
   }

   @action.bound
   setAdminObservationListApiResponse(adminObservationListResponse) {
      console.log('admin response', adminObservationListResponse)
      this.listOfObservationsTotalPages = Math.ceil(
         adminObservationListResponse.total_observations_count / LIMIT
      )
      if (
         this.listOfObservationsTotalPages < this.listOfObservationsCurrentPage
      )
         this.listOfObservationsCurrentPage = 1
      this.adminObservationsList = adminObservationListResponse.all_observations.map(
         observation => new AdminObsevationModel(observation)
      )
      this.userType = USER
   }
   @action.bound
   filterCategory(value) {
      this.categotyFilterType = value
      this.listOfObservationsCurrentPage = 1
      this.getCategoryAndSubCategoryId()
      this.getAdminObservationList()
   }
   @action.bound
   filterSubCategory(value) {
      this.subCategotyFilterType = value
      this.listOfObservationsCurrentPage = 1
      this.getCategoryAndSubCategoryId()
      this.getAdminObservationList()
   }
   @action.bound
   setStatusFilterOfList = value => {
      this.statusFilterOfList = value.value
      this.listOfObservationsCurrentPage = 1
      this.getAdminObservationList()
   }

   @computed get getSubCateogariesMultiple() {
      let categories = []
      if (this.categotyFilterType) {
         this.categotyFilterType.forEach(category =>
            categories.push(category.value)
         )
         let subCategories = []
         this.cateogaries.forEach(category => {
            if (categories.includes(category.name)) {
               subCategories.push(...category.sub_categories)
            }
         })
         let temp = []
         toJS(subCategories).forEach(category => temp.push(category.name))
         return temp
      }
      return []
   }

   getCategoryAndSubCategoryId = () => {
      let categories_ids = []
      if (this.categotyFilterType) {
         this.categotyFilterType.forEach(cateogary => {
            this.cateogaries.forEach(cateogary2 => {
               if (cateogary.value == cateogary2.name)
                  categories_ids.push(cateogary2.category_id)
            })
         })
      } else return [[], []]
      if (this.subCategotyFilterType) {
         let sub_category_ids = []
         this.subCategotyFilterType.forEach(subCategory => {
            this.cateogaries.forEach(cateogary => {
               cateogary.sub_categories.forEach(subCategory2 => {
                  if (subCategory2.name === subCategory.value) {
                     sub_category_ids.push(subCategory2.sub_category_id)
                  }
               })
            })
         })
         return [categories_ids, sub_category_ids]
      } else return [[], []]
   }

   @action.bound
   goToPreviousObservations() {
      this.listOfObservationsCurrentPage--
      this.getAdminObservationList()
   }

   @action.bound
   goToNextObservations() {
      this.listOfObservationsCurrentPage++
      this.getAdminObservationList()
   }

   @action.bound
   goToRandomObservations(value) {
      this.listOfObservationsCurrentPage = parseInt(value, 10)
      this.getAdminObservationList()
   }
}
export { AdminStore }
