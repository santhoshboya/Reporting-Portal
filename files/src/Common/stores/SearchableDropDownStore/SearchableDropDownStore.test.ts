import { cleanup } from '@testing-library/react'

import {
   API_INITIAL,
   API_FETCHING,
   API_SUCCESS,
   API_FAILED
} from '@ib/api-constants'

import SearchableDropDownServiceAPI from '../../services/SearchableDropDownService/index.fixture'
import getSearchResults from '../../fixtures/getSearchResults.json'
import SearchableDropDownStore from './index'

describe('SearchableDropDownStore tests', () => {
   let searchableDropDownStore, searchableDropDownServiceAPI
   beforeEach(() => {
      searchableDropDownServiceAPI = new SearchableDropDownServiceAPI('', '')
      searchableDropDownStore = new SearchableDropDownStore(
         searchableDropDownServiceAPI
      )
   })

   afterEach(cleanup)

   it('should test initialization', () => {
      expect(searchableDropDownStore.getSearchResultsResponseStatus).toBe(
         API_INITIAL
      )
      expect(searchableDropDownStore.getSearchResultsResponseError).toBe(null)

      expect(searchableDropDownStore.searchResultsArray).toStrictEqual([])
   })

   it('should test getSearchResultsData fetching state', () => {
      const mockLoadingPromise = new Promise((resolve, reject) => {})

      const mockSearchableDropDownServiceAPI = jest.fn()
      mockSearchableDropDownServiceAPI.mockReturnValue(mockLoadingPromise)
      searchableDropDownServiceAPI.getSeachResultsAPI = mockSearchableDropDownServiceAPI

      searchableDropDownStore.getSearchResultsData()
      expect(searchableDropDownStore.getSearchResultsResponseStatus).toBe(
         API_FETCHING
      )
   })

   it('should test getSearchResultsData success state', async () => {
      const mockSuccessPromise = new Promise((resolve, reject) => {
         resolve(getSearchResults)
      })

      const mockSearchableDropDownServiceAPI = jest.fn()
      mockSearchableDropDownServiceAPI.mockReturnValue(mockSuccessPromise)
      searchableDropDownServiceAPI.getSeachResultsAPI = mockSearchableDropDownServiceAPI

      await searchableDropDownStore.getSearchResultsData()
      expect(searchableDropDownStore.getSearchResultsResponseStatus).toBe(
         API_SUCCESS
      )
   })

   it('should test getSearchResultsData failure state', async () => {
      const mockFailurePromise = new Promise((resolve, reject) => {
         reject(new Error('failure'))
      })

      const mockSearchableDropDownServiceAPI = jest.fn()
      mockSearchableDropDownServiceAPI.mockReturnValue(mockFailurePromise)
      searchableDropDownServiceAPI.getSeachResultsAPI = mockSearchableDropDownServiceAPI

      await searchableDropDownStore.getSearchResultsData()
      expect(searchableDropDownStore.getSearchResultsResponseStatus).toBe(
         API_FAILED
      )
      expect(searchableDropDownStore.getSearchResultsResponseError).toBe(
         'failure'
      )
   })
})
