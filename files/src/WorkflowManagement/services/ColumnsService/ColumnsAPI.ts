import { create, ApisauceInstance } from 'apisauce'

import { apiMethods } from '../../../Common/constants/APIConstants'
import ENV from '../../../Common/constants/EnvironmentConstants'

import { GetTasksOverviewParameters } from '../../stores/types'

import ColumnsService from '.'

const BASE_URL = `${ENV.BASE_URL}api/ib_boards`

class ColumnsAPI implements ColumnsService {
   api: ApisauceInstance
   networkCallWithApiSauce: Function

   constructor(networkCallWithApisauce) {
      this.api = create({
         baseURL: BASE_URL
      })
      this.networkCallWithApiSauce = networkCallWithApisauce
   }

   getColumns = ({ limit, offset, boardId }) => {
      const endPoint = `/boards/${boardId}/columns/v1/?limit=${limit}&offset=${offset}`
      return this.networkCallWithApiSauce(
         this.api,
         endPoint,
         {},
         apiMethods.get
      )
   }
   getTasksOverview = (parameters: GetTasksOverviewParameters) => {
      const { columnId, limit, offset } = parameters
      const endPoint = `/columns/${columnId}/tasks/v1/?limit=${limit}&offset=${offset}`
      return this.networkCallWithApiSauce(
         this.api,
         endPoint,
         {},
         apiMethods.get
      )
   }
}
export default ColumnsAPI
