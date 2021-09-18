import { action, observable } from 'mobx'

import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import { APIStatus, API_INITIAL } from '@ib/api-constants'

import ColumnsService from '../../services/ColumnsService'
import TaskActionsApi from '../../services/TaskActionsService'

import ColumnModel from '../models/ColumnModel'
import TaskOverviewModel from '../models/TaskOverviewModel'
import { LIMIT } from '../../constants/BoardsStoreConstant'

class ColumnsStore {
   @observable columns!: Array<ColumnModel>
   @observable highlightedColumnsList!: Array<string>

   totalColumns!: number | null
   @observable selectedBoardId!: string

   @observable getColumnsAPIStatus!: APIStatus
   @observable getColumnsAPIError!: Error | null

   columnsService: ColumnsService
   taskActionService: TaskActionsApi

   constructor(
      columnsService: ColumnsService,
      taskActionsService: TaskActionsApi
   ) {
      this.columnsService = columnsService
      this.taskActionService = taskActionsService
      this.init()
   }

   init = () => {
      this.columns = []
      this.getColumnsAPIError = null
      this.getColumnsAPIStatus = API_INITIAL
      this.selectedBoardId = ''
      this.highlightedColumnsList = []
   }

   @action.bound
   setSelectedBoard(boardId: string) {
      this.selectedBoardId = boardId
   }

   @action.bound
   resetHighlightedColumnsList() {
      this.highlightedColumnsList = []
   }

   updateDraggedTaskColumn(columnId, taskId) {
      this.columns.forEach(column => {
         if (column.id === columnId) {
            const taskIndex = column.taskStore.tasks.findIndex(
               task => task.id === taskId
            )
            column.taskStore.tasks.splice(taskIndex, 1)
         }
      })
   }

   @action.bound
   updateColumnsOnPerfommingAction(response, columnId, taskId) {
      this.setGetTaskActionsAPIResponse(response)
      this.updateDraggedTaskColumn(columnId, taskId)
   }

   @action.bound
   setGetTaskActionsAPIResponse(response) {
      this.resetHighlightedColumnsList()
      const { current_board_details, task_id } = response
      const { column_details } = current_board_details

      this.columns.forEach(column => {
         column_details.forEach(droppedColumn => {
            if (droppedColumn.column_id === column.id) {
               const { column_id, column_name, ...other } = droppedColumn
               column.taskStore.tasks.push(
                  new TaskOverviewModel(
                     { task_id, ...other },
                     this.taskActionService,
                     this.updateColumnsOnPerfommingAction,
                     this.selectedBoardId
                  )
               )
               this.highlightedColumnsList.push(column.id)
            }
         })
      })
   }

   @action.bound
   setGetColumnsAPIStatus(status) {
      this.getColumnsAPIStatus = status
   }

   @action.bound
   setGetColumnsAPIError(error) {
      this.getColumnsAPIError = error
   }

   @action.bound
   setGetColumnsAPIResponse(response) {
      const { getTasksOverview } = this.columnsService
      this.columns = response.columns.map(
         column =>
            new ColumnModel(
               column,
               getTasksOverview,
               this.taskActionService,
               this.updateColumnsOnPerfommingAction,
               this.selectedBoardId
            )
      )
   }

   @action.bound
   getColumns = (onSuccess = (): void => {}) => {
      const requestObject = {
         limit: LIMIT,
         offset: this.columns.length,
         boardId: this.selectedBoardId
      }
      const getColumnsPromise = this.columnsService.getColumns(requestObject)
      return bindPromiseWithOnSuccess(getColumnsPromise)
         .to(this.setGetColumnsAPIStatus, response => {
            this.setGetColumnsAPIResponse(response)
            onSuccess()
         })
         .catch(this.setGetColumnsAPIError)
   }

   @action.bound
   clearStore() {
      this.init()
   }
}
export default ColumnsStore
