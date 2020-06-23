import React, { Component } from 'react'
import { observable, action } from 'mobx'
import { API_INITIAL } from '@ib/api-constants'
import { UserStore } from '../../../UserModule/stores/UserStore'
import { ObservationFixtureService } from '../../../UserModule/services/ObservationFixtureService/ObservationFixtureService'

import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import { RpModel } from '../Models/RpModel'
const SORT_OPTIONS = ['new', 'old']
const SORT_KEYS = ['due_date', 'reported_on']
const SORT_KEY = 'reported_on'
const FILTER_TYPE = 'all'
const USERTYPE = 'Rp'
const LIMIT = 4
class RpStore extends UserStore {
   @observable assignedObservationsSortType
   @observable assignedObservationsSortOption
   @observable assignedObservationReportedOnSortType
   @observable assignedObservationDueDateSortType
   @observable assignedObservationAPIStatus
   @observable assignedObservationAPIError
   @observable rpObservationAPIService
   @observable assignedObservationListForRp
   @observable assignedObservationsCurrentPage
   @observable assignedObservationsTotalPages
   @observable filterTypeOfAssignedObservation

   constructor(rpObservationFixtureService, observationFixtureService) {
      super(observationFixtureService)
      this.rpStoreInit()
      this.rpObservationAPIService = rpObservationFixtureService
   }

   rpStoreInit = () => {
      this.assignedObservationAPIStatus = API_INITIAL
      this.assignedObservationAPIError = null
      this.assignedObservationListForRp = []
      this.assignedObservationsSortType = SORT_KEY
      this.assignedObservationsCurrentPage = 1
      this.filterTypeOfAssignedObservation = FILTER_TYPE
      this.assignedObservationsSortOption = SORT_OPTIONS[0]
      this.assignedObservationReportedOnSortType = SORT_OPTIONS[0]
      this.assignedObservationDueDateSortType = SORT_OPTIONS[0]
   }

   @action.bound
   getAssignedObservationList() {
      let offset = Math.ceil(LIMIT * (this.assignedObservationsCurrentPage - 1))
      let details = {
         user_type: USERTYPE,
         sort_on: this.assignedObservationsSortType,
         sort_by: this.assignedObservationsSortOption,
         filter_on: this.filterTypeOfAssignedObservation
      }
      const userObservationPromise = this.rpObservationAPIService.getAssignedObservationListApi(
         LIMIT,
         offset,
         details
      )
      return bindPromiseWithOnSuccess(userObservationPromise)
         .to(
            this.setAssignedObservationListApiAPIStatus,
            this.setAssignedObservationListApiResponse
         )
         .catch(this.setAssignedObservationListApiAPIError)
   }

   @action.bound
   setAssignedObservationListApiAPIStatus(apiStatus) {
      this.assignedObservationAPIStatus = apiStatus
   }

   @action.bound
   setAssignedObservationListApiAPIError(error) {
      this.assignedObservationAPIError = error
   }

   @action.bound
   setAssignedObservationListApiResponse(assignedObservationListResponse) {
      this.assignedObservationsTotalPages = Math.ceil(
         assignedObservationListResponse.total_observations_count / LIMIT
      )

      if (
         this.assignedObservationsTotalPages <
         this.assignedObservationsCurrentPage
      ) {
         this.assignedObservationsCurrentPage = 1
      }

      this.assignedObservationListForRp = assignedObservationListResponse.observations_assigned_to_rp.map(
         observation => new RpModel(observation)
      )

      this.userType = assignedObservationListResponse.user_type
   }
   @action.bound
   assignedObservationsReportedOnSort() {
      if (this.assignedObservationReportedOnSortType === SORT_OPTIONS[0])
         this.assignedObservationReportedOnSortType = SORT_OPTIONS[1]
      else this.assignedObservationReportedOnSortType = SORT_OPTIONS[0]
      this.assignedObservationsSortType = SORT_KEYS[1]
      this.assignedObservationsSortOption = this.assignedObservationReportedOnSortType
      this.getAssignedObservationList()
   }
   @action.bound
   assignedObservationsDueDateOnSort() {
      if (this.assignedObservationDueDateSortType === SORT_OPTIONS[0])
         this.assignedObservationDueDateSortType = SORT_OPTIONS[1]
      else this.assignedObservationDueDateSortType = SORT_OPTIONS[0]
      this.assignedObservationsSortType = SORT_KEYS[0]
      this.assignedObservationsSortOption = this.assignedObservationDueDateSortType
      this.getAssignedObservationList()
   }

   @action.bound
   assignedObservationsGoToPreviousPage() {
      this.assignedObservationsCurrentPage--
      this.getAssignedObservationList()
   }
   @action.bound
   assignedObservationsGoToNextPage() {
      this.assignedObservationsCurrentPage++
      this.getAssignedObservationList()
   }
   @action.bound
   assignedObservationsGoToRandomPage(value) {
      this.assignedObservationsCurrentPage = parseInt(value, 10)
      this.getAssignedObservationList()
   }
   @action.bound
   filterAssignedObservationList(value) {
      this.filterTypeOfAssignedObservation = value
      this.assignedObservationsCurrentPage = 1
      this.getAssignedObservationList()
   }
}
export { RpStore }
