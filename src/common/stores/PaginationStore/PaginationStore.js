import { observable, action } from 'mobx'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import { getUserDisplayableErrorMessage } from '../../utils/APIUtils'
import { RpModel } from '../../../RpModule/stores/Models/RpModel'

class PaginationStore {
   getEntitiesApi
   limit
   EntityModel
   @observable entitiesListApiStatus
   @observable entitiesListApiError
   @observable entitiesList
   @observable selectedPage = 1
   @observable totalPages
   constructor(getEntitiesApi, limit, EntityModel) {
      this.getEntitiesApi = getEntitiesApi
      this.limit = limit
      this.EntityModel = EntityModel
   }
   @action.bound
   getEntities(details) {
      let offset = Math.ceil(this.limit * (this.selectedPage - 1))
      const entitiesListPromise = this.getEntitiesApi(
         this.limit,
         offset,
         details
      )
      return bindPromiseWithOnSuccess(entitiesListPromise)
         .to(this.setEntitiesListApiStatus, this.setEntitiesListApiResponse)
         .catch(this.setEntitiesListApiError)
   }
   @action.bound
   setEntitiesListApiStatus(apiStatus) {
      this.entitiesListApiStatus = apiStatus
   }
   @action.bound
   setEntitiesListApiError(error) {
      this.entitiesListApiError = getUserDisplayableErrorMessage(error)
   }
   @action.bound
   setEntitiesListApiResponse(response) {
      if (this.totalPages < this.selectedPage) {
         this.selectedPage = 1
      }
      console.log(response)

      this.totalPages = Math.ceil(response.total / this.limit)
      this.entitiesList = response.result.map(item => new RpModel(item))
   }
   @action.bound
   setSelectedPage(value) {
      this.selectedPage += parseInt(value)
   }
}
export { PaginationStore }
