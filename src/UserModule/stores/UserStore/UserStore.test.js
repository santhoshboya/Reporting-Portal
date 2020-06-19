import {
   API_SUCCESS,
   API_FAILED,
   API_FETCHING,
   API_INITIAL
} from '@ib/api-constants'

import getObservationsResponse from '../../fixtures/getObservationsResponse.json'
import getObservation from '../../fixtures/getObservationResponse.json'
import getCateogaries from '../../fixtures/getCateogaries.json'
import { ObservationFixtureService } from '../../services/ObservationFixtureService/ObservationFixtureService'
import { UserStore } from './UserStore'
import { ObservationApiService } from '../../services/ObservationApiService/ObservationApiService'

const SORT_OPTIONS = ['new', 'old']
const SORT_KEYS = ['due_date', 'reported_on']
const SORT_KEY = 'reported_on'
describe('UserStore Store tests', () => {
   let obsevationsAPI
   let userStore
   let dummyObservationApi
   let apiUserStore
   beforeEach(() => {
      obsevationsAPI = new ObservationFixtureService()
      userStore = new UserStore(obsevationsAPI)

      dummyObservationApi = new ObservationApiService()
      apiUserStore = new UserStore(dummyObservationApi)
   })
   it('should test initialising user store', () => {
      expect(userStore.getObservationListAPIStatus).toBe(API_INITIAL)
      expect(userStore.getObservationListAPIError).toBe(null)
      expect(userStore.observationList).toStrictEqual(new Array())
   })

   it('should test obseravtionsListApi data fetching state', () => {
      const mockLoadingPromise = new Promise(function(resolve, reject) {})
      const mockObservationsAPI = jest.fn()
      mockObservationsAPI.mockReturnValue(mockLoadingPromise)
      obsevationsAPI.getObservationListApi = mockObservationsAPI
      dummyObservationApi.getObservationListApi = mockObservationsAPI
      apiUserStore.getObservationList()
      userStore.getObservationList()
      expect(userStore.getObservationListAPIStatus).toBe(API_FETCHING)
   })

   it('should test observationListApi success state', async () => {
      const mockSuccessPromise = new Promise(function(resolve, reject) {
         resolve(getObservationsResponse)
      })
      const mockObservationsAPI = jest.fn()
      mockObservationsAPI.mockReturnValue(mockSuccessPromise)
      obsevationsAPI.getObservationListApi = mockObservationsAPI
      await userStore.getObservationList()
      expect(userStore.getObservationListAPIStatus).toBe(API_SUCCESS)
   })

   it('should test obseravtionsListApi failure state', async () => {
      const mockFailurePromise = new Promise(function(resolve, reject) {
         reject(new Error('error'))
      })
      const mockObservationsAPI = jest.fn()
      mockObservationsAPI.mockReturnValue(mockFailurePromise)
      obsevationsAPI.getObservationListApi = mockObservationsAPI

      await userStore.getObservationList()
      expect(userStore.getObservationListAPIStatus).toBe(API_FAILED)
   })

   it('should test obseravtion Api data fetching state', () => {
      const mockLoadingPromise = new Promise(function(resolve, reject) {})
      const mockObservationsAPI = jest.fn()
      mockObservationsAPI.mockReturnValue(mockLoadingPromise)
      obsevationsAPI.getObservationApi = mockObservationsAPI

      userStore.getObservation()
      expect(userStore.getObservationAPIStatus).toBe(API_FETCHING)
   })

   it('should test observationApi success state', async () => {
      const mockSuccessPromise = new Promise(function(resolve, reject) {
         resolve(getObservation)
      })
      const mockObservationAPI = jest.fn()
      mockObservationAPI.mockReturnValue(mockSuccessPromise)
      obsevationsAPI.getObservationApi = mockObservationAPI
      const success = jest.fn()
      const failure = jest.fn()

      await userStore.getObservation({}, success, failure)
      expect(userStore.getObservationAPIStatus).toBe(API_SUCCESS)
   })

   it('should test observationApi failure state', async () => {
      const mockSuccessPromise = Promise.reject('Error')
      const mockObservationAPI = jest.fn()
      mockObservationAPI.mockReturnValue(mockSuccessPromise)
      obsevationsAPI.getObservationApi = mockObservationAPI
      const success = jest.fn()
      const failure = jest.fn()
      await userStore.getObservation({}, success, failure)
      expect(userStore.getObservationAPIStatus).toBe(API_FAILED)
   })

   it('should test cateogaries Api data fetching state', () => {
      const mockLoadingPromise = new Promise(function(resolve, reject) {})
      const mockObservationsAPI = jest.fn()
      mockObservationsAPI.mockReturnValue(mockLoadingPromise)
      obsevationsAPI.getCateogariesApi = mockObservationsAPI
      const success = jest.fn()
      const failure = jest.fn()
      userStore.getCateogaries({}, success, failure)
      expect(userStore.getCateogariesAPIStatus).toBe(API_FETCHING)
   })

   it('should test cateogaries Api data success state', async () => {
      const mockLoadingPromise = Promise.resolve(getCateogaries)
      const mockObservationsAPI = jest.fn()
      mockObservationsAPI.mockReturnValue(mockLoadingPromise)
      obsevationsAPI.getCateogariesApi = mockObservationsAPI
      const success = jest.fn()
      const failure = jest.fn()
      await userStore.getCateogaries({}, success, failure)
      expect(userStore.getCateogariesAPIStatus).toBe(API_SUCCESS)
   })
   it('should test cateogaries Api data failure state', async () => {
      const mockLoadingPromise = Promise.reject('Error')
      const mockObservationsAPI = jest.fn()
      mockObservationsAPI.mockReturnValue(mockLoadingPromise)
      obsevationsAPI.getCateogariesApi = mockObservationsAPI
      const success = jest.fn()
      const failure = jest.fn()
      await userStore.getCateogaries({}, success, failure)
      expect(userStore.getCateogariesAPIStatus).toBe(API_FAILED)
   })

   it('should test add new observation Api data fetching state', () => {
      const mockLoadingPromise = new Promise(function(resolve, reject) {})
      const mockObservationsAPI = jest.fn()
      mockObservationsAPI.mockReturnValue(mockLoadingPromise)
      obsevationsAPI.postObservationApi = mockObservationsAPI
      const success = jest.fn()
      const failure = jest.fn()
      userStore.addNewObservation({}, success, failure)
      expect(userStore.getPostObservationAPIStatus).toBe(API_FETCHING)
   })

   it('should test add new observation Api data success state', async () => {
      const mockLoadingPromise = Promise.resolve('new observation Added ')
      const mockObservationsAPI = jest.fn()
      mockObservationsAPI.mockReturnValue(mockLoadingPromise)
      obsevationsAPI.postObservationApi = mockObservationsAPI
      const success = jest.fn()
      const failure = jest.fn()
      await userStore.addNewObservation({}, success, failure)
      expect(userStore.getPostObservationAPIStatus).toBe(API_SUCCESS)
   })

   it('should test add new observation Api data failure state', async () => {
      const mockLoadingPromise = Promise.reject('Error')
      const mockObservationsAPI = jest.fn()
      mockObservationsAPI.mockReturnValue(mockLoadingPromise)
      obsevationsAPI.postObservationApi = mockObservationsAPI
      const success = jest.fn()
      const failure = jest.fn()
      await userStore.addNewObservation({}, success, failure)
      expect(userStore.getPostObservationAPIStatus).toBe(API_FAILED)
   })

   it('Should test go to previous page ', () => {
      let currentPage = userStore.currentPage
      userStore.goToPreviousPage()
      expect(userStore.currentPage).toBe(currentPage - 1)
   })

   it('Should test go to next page ', () => {
      let currentPage = userStore.currentPage
      userStore.goToNextPage()
      expect(userStore.currentPage).toBe(currentPage + 1)
   })

   it('Should test go to  page ', () => {
      let currentPage = userStore.currentPage
      userStore.goToNextPage()
      expect(userStore.currentPage).toBe(currentPage + 1)
   })

   it('Should test go to random Page', () => {
      const page = 10
      let currentPage = page
      userStore.goToRandomPage(page)
      expect(userStore.currentPage).toBe(currentPage)
   })

   it('Should test filtering observations List', () => {
      const value = 4
      let filterTypeOfObservation = value
      userStore.filterObservationList(value)
      expect(userStore.filterType).toBe(filterTypeOfObservation)
   })

   it('Should test reported on sort function', () => {
      userStore.reportedOnSort()
      expect(userStore.observationsSortType).toBe(SORT_KEYS[1])
      expect(userStore.observationsSortOption).toBe(SORT_OPTIONS[1])
   })
   it('Should test duedate sort function', () => {
      userStore.dueDateOnSort()
      expect(userStore.observationsSortType).toBe(SORT_KEYS[0])
      expect(userStore.observationsSortOption).toBe(SORT_OPTIONS[1])
   })
})
