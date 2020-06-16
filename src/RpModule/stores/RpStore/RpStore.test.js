import {
   API_SUCCESS,
   API_FAILED,
   API_FETCHING,
   API_INITIAL
} from '@ib/api-constants'
import { RpObservationFixtureService } from '../../services/RpObservationFixtureService/RpObservationFixtureService'
import { ObservationFixtureService } from '../../../UserModule/services/ObservationFixtureService/ObservationFixtureService'
import getAssignedObservationsResponse from '../../fixtures/getAssignedObservationsResponse.json'
import { RpStore } from './RpStore'

describe('RpStore Store tests', () => {
   let rpObsevationsAPI
   let userObsevationsAPI
   let rpStore
   beforeEach(() => {
      rpObsevationsAPI = new RpObservationFixtureService()
      userObsevationsAPI = new ObservationFixtureService()
      rpStore = new RpStore(rpObsevationsAPI, userObsevationsAPI)
   })
   it('should test initialising rp store', () => {
      expect(rpStore.updateObservationAPIStatus).toBe(API_INITIAL)
      expect(rpStore.updateObservationAPIError).toBe(null)
      expect(rpStore.assignedObservationListForRp).toStrictEqual(new Array())
      expect(rpStore.assignedObservationAPIStatus).toBe(API_INITIAL)
      expect(rpStore.assignedObservationAPIError).toBe(null)
   })
   it('should test get Assigned observations list fetching state', () => {
      const mockAssignedObservationListPromise = new Promise(function(
         resolve,
         reject
      ) {})
      const mockAssignedObservationListApi = jest.fn()
      mockAssignedObservationListApi.mockReturnValue(
         mockAssignedObservationListPromise
      )
      rpObsevationsAPI.getAssignedObservationListApi = mockAssignedObservationListApi

      rpStore.getAssignedObservationList()
      expect(rpStore.assignedObservationAPIStatus).toBe(API_FETCHING)
   })
   it('should test get Assigned observations list success state', async () => {
      const mockAssignedObservationListPromise = new Promise(function(
         resolve,
         reject
      ) {
         resolve(getAssignedObservationsResponse)
      })
      const mockAssignedObservationListApi = jest.fn()
      mockAssignedObservationListApi.mockReturnValue(
         mockAssignedObservationListPromise
      )
      rpObsevationsAPI.getAssignedObservationListApi = mockAssignedObservationListApi

      await rpStore.getAssignedObservationList()
      expect(rpStore.assignedObservationAPIStatus).toBe(API_SUCCESS)
   })

   it('should test get Assigned observations list failure state', async () => {
      const mockAssignedObservationListPromise = new Promise(function(
         resolve,
         reject
      ) {
         reject(new Error('error'))
      })
      const mockAssignedObservationListApi = jest.fn()
      mockAssignedObservationListApi.mockReturnValue(
         mockAssignedObservationListPromise
      )
      rpObsevationsAPI.getAssignedObservationListApi = mockAssignedObservationListApi

      await rpStore.getAssignedObservationList()
      expect(rpStore.assignedObservationAPIStatus).toBe(API_FAILED)
   })

   it('should test get Update observations list fetching state', () => {
      const mockUpdateObservationPromise = new Promise(function(
         resolve,
         reject
      ) {})
      const mockUpdateObservationApi = jest.fn()
      mockUpdateObservationApi.mockReturnValue(mockUpdateObservationPromise)
      rpObsevationsAPI.updateObservationApi = mockUpdateObservationApi

      rpStore.updateObservationDeatails()
      expect(rpStore.updateObservationAPIStatus).toBe(API_FETCHING)
   })
   it('should test get Update observations list success state', async () => {
      const mockUpdateObservationPromise = Promise.resolve('Updated')
      const mockUpdateObservationApi = jest
         .fn()
         .mockReturnValue(mockUpdateObservationPromise)
      rpObsevationsAPI.updateObservationApi = mockUpdateObservationApi

      await rpStore.updateObservationDeatails()
      expect(rpStore.updateObservationAPIStatus).toBe(API_SUCCESS)
   })

   // it('should test get Update observations list failure state', async () => {
   //    const mockUpdateObservationPromise = Promise.reject('error')
   //    const mockUpdateObservationApi = jest
   //       .fn()
   //       .mockReturnValue(mockUpdateObservationPromise)
   //    rpObsevationsAPI.updateObservationApi = mockUpdateObservationApi
   //    const callBackFn = jest.fn()
   //    await rpStore.updateObservationDeatails(callBackFn)
   //    expect(rpStore.updateObservationAPIStatus).toBe(API_FAILED)
   // })

   it('Should test go to previous page ', () => {
      let assignedObservationsCurrentPage =
         rpStore.assignedObservationsCurrentPage
      rpStore.assignedObservationsGoToPreviousPage()
      expect(rpStore.assignedObservationsCurrentPage).toBe(
         assignedObservationsCurrentPage - 1
      )
   })
   it('Should test go to next page ', () => {
      let assignedObservationsCurrentPage =
         rpStore.assignedObservationsCurrentPage
      rpStore.assignedObservationsGoToNextPage()
      expect(rpStore.assignedObservationsCurrentPage).toBe(
         assignedObservationsCurrentPage + 1
      )
   })

   it('Should test go to random Page', () => {
      const page = 10
      let assignedObservationsCurrentPage = page
      rpStore.assignedObservationsGoToRandomPage(page)
      expect(rpStore.assignedObservationsCurrentPage).toBe(
         assignedObservationsCurrentPage
      )
   })

   it('Should test filtering observations List', () => {
      const value = 4
      let filterTypeOfAssignedObservation = value
      rpStore.filterAssignedObservationList(value)
      expect(rpStore.filterTypeOfAssignedObservation).toBe(
         filterTypeOfAssignedObservation
      )
   })
})
