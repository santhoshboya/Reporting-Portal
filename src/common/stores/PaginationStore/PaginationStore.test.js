import {
   API_SUCCESS,
   API_FAILED,
   API_FETCHING,
   API_INITIAL
} from '@ib/api-constants'
const LIMIT = 3
import getObservationsResponse from '../../../UserModule/fixtures/getObservationsResponse.json'
import { ObservationFixtureService } from '../../../UserModule/services/ObservationFixtureService/ObservationFixtureService'
import { PaginationStore } from './PaginationStore'
import { Observation } from '../../../UserModule/stores/Models/Observation'

describe('UserStore Store tests', () => {
   let obsevationsAPIMethod
   let paginationStore
   beforeEach(() => {
      obsevationsAPIMethod = new ObservationFixtureService()
         .getObservationListApi
      paginationStore = new PaginationStore(
         obsevationsAPIMethod,
         LIMIT,
         Observation
      )
   })
   it('should test initialising pagination store', () => {
      expect(paginationStore.entitiesListApiStatus).toBe(API_INITIAL)
      expect(paginationStore.entitiesListApiError).toBe(null)
      expect(paginationStore.entitiesList).toStrictEqual(new Array())
   })

   it('should test entitiesListApi data fetching state', () => {
      const mockLoadingPromise = new Promise(function(resolve, reject) {})
      const mockObservationsAPI = jest.fn()
      mockObservationsAPI.mockReturnValue(mockLoadingPromise)
      obsevationsAPIMethod = mockObservationsAPI

      paginationStore.getEntities()
      expect(paginationStore.entitiesListApiStatus).toBe(API_FETCHING)
   })

   it('Should test select page ', () => {
      let selectedPage = paginationStore.selectedPage
      const value = 1
      paginationStore.setSelectedPage(value)
      expect(paginationStore.selectedPage).toBe(selectedPage + value)
   })

   // it('should test entitiesListApi data success state', async () => {
   //    const mockLoadingPromise = Promise.resolve(getObservationsResponse)
   //    const mockObservationsAPI = jest.fn()
   //    mockObservationsAPI.mockReturnValue(mockLoadingPromise)
   //    paginationStore.getEntitiesApi = mockObservationsAPI
   //    await paginationStore.getEntities({})
   //    expect(paginationStore.entitiesListApiStatus).toBe(API_SUCCESS)
   // })

   // it('should test entitiesListApi data failure state', () => {
   //     const mockLoadingPromise = Promise.reject('error')
   //     const mockObservationsAPI = jest.fn()
   //     mockObservationsAPI.mockReturnValue(mockLoadingPromise)
   //     paginationStore.getEntitiesApi = mockObservationsAPI
   //     console.log('11111111', obsevationsAPIMethod, mockLoadingPromise)

   //     paginationStore.getEntities({})
   //     expect(paginationStore.entitiesListApiStatus).toBe(API_FAILED)
   // })

   //    it('should test observationListApi success state', async () => {
   //       const mockSuccessPromise = new Promise(function(resolve, reject) {
   //          resolve(getObservationsResponse)
   //       })
   //       const mockObservationsAPI = jest.fn()
   //       mockObservationsAPI.mockReturnValue(mockSuccessPromise)
   //       obsevationsAPI.getObservationListApi = mockObservationsAPI
   //       await userStore.getObservationList()
   //       expect(userStore.getObservationListAPIStatus).toBe(API_SUCCESS)
   //    })

   //    it('should test obseravtionsListApi failure state', async () => {
   //       const mockFailurePromise = new Promise(function(resolve, reject) {
   //          reject(new Error('error'))
   //       })
   //       const mockObservationsAPI = jest.fn()
   //       mockObservationsAPI.mockReturnValue(mockFailurePromise)
   //       obsevationsAPI.getObservationListApi = mockObservationsAPI

   //       await userStore.getObservationList()
   //       expect(userStore.getObservationListAPIStatus).toBe(API_FAILED)
   //    })

   //    it('Should test go to next page ', () => {
   //       let currentPage = userStore.currentPage
   //       userStore.goToNextPage()
   //       expect(userStore.currentPage).toBe(currentPage + 1)
   //    })
})
