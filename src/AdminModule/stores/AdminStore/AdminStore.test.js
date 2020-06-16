import {
   API_SUCCESS,
   API_FAILED,
   API_FETCHING,
   API_INITIAL
} from '@ib/api-constants'

import getObservationsResponse from '../../fixtures/getObservationsResponse.json'
import { AdminObservationFixtureService } from '../../services/AdminObservationFixtureService/AdminObservationFixtureService'
import { AdminStore } from './AdminStore'
describe('AdminStore Store tests', () => {
   let obsevationsAPI
   let adminStore
   beforeEach(() => {
      obsevationsAPI = new AdminObservationFixtureService()
      adminStore = new AdminStore(obsevationsAPI)
   })
   it('should test initialising admin store', () => {
      expect(adminStore.adminObservationsListAPIStatus).toBe(API_INITIAL)
      expect(adminStore.adminObservationsListAPIError).toBe(null)
      expect(adminStore.adminObservationsList).toStrictEqual(new Array())
   })

   it('should test getAdminObservationList data fetching state', () => {
      const mockLoadingPromise = new Promise(function(resolve, reject) {})
      const mockObservationsAPI = jest.fn()
      mockObservationsAPI.mockReturnValue(mockLoadingPromise)
      obsevationsAPI.listOfObservationApi = mockObservationsAPI

      adminStore.getAdminObservationList()
      expect(adminStore.adminObservationsListAPIStatus).toBe(API_FETCHING)
   })

   it('should test getAdminObservationList success state', async () => {
      const mockSuccessPromise = new Promise(function(resolve, reject) {
         resolve(getObservationsResponse)
      })
      const mockObservationsAPI = jest.fn()
      mockObservationsAPI.mockReturnValue(mockSuccessPromise)
      obsevationsAPI.listOfObservationApi = mockObservationsAPI
      await adminStore.getAdminObservationList()
      expect(adminStore.adminObservationsListAPIStatus).toBe(API_SUCCESS)
   })

   it('should test getAdminObservationList failure state', async () => {
      const mockSuccessPromise = new Promise(function(resolve, reject) {
         reject('error')
      })
      const mockObservationsAPI = jest.fn()
      mockObservationsAPI.mockReturnValue(mockSuccessPromise)
      obsevationsAPI.listOfObservationApi = mockObservationsAPI
      await adminStore.getAdminObservationList()
      expect(adminStore.adminObservationsListAPIStatus).toBe(API_FAILED)
   })

   it('Should test filtering category', () => {
      const value = [{ value: 'completed' }]
      let filterTypeOfObservation = value
      adminStore.filterCategory(value)
      expect(adminStore.categotyFilterType).toStrictEqual(
         filterTypeOfObservation
      )
   })

   it('Should test filtering subcategory', () => {
      const value = [{ value: 'completed' }]
      let filterTypeOfObservation = value
      adminStore.filterSubCategory(value)
      expect(adminStore.subCategotyFilterType).toStrictEqual(
         filterTypeOfObservation
      )
   })

   it('Should test filtering status', () => {
      const value = { value: 'completed' }
      let filterTypeOfObservation = value
      adminStore.setStatusFilterOfList(value)
      expect(adminStore.statusFilterOfList).toStrictEqual(
         filterTypeOfObservation.value
      )
   })

   it('Should test Go to previous page', () => {
      const value = 5
      adminStore.listOfObservationsCurrentPage = value
      adminStore.goToPreviousObservations()
      expect(adminStore.listOfObservationsCurrentPage).toBe(value - 1)
   })
   it('Should test Go to next page', () => {
      const value = 5
      adminStore.listOfObservationsCurrentPage = value
      adminStore.goToNextObservations()
      expect(adminStore.listOfObservationsCurrentPage).toBe(value + 1)
   })
   it('Should test Go to specific page', () => {
      const value = 5
      adminStore.goToRandomObservations(value)
      expect(adminStore.listOfObservationsCurrentPage).toBe(value)
   })

   it('Should test computed getSubCateogariesMultiple', () => {
      expect(adminStore.getSubCateogariesMultiple).toStrictEqual([])
   })
})
