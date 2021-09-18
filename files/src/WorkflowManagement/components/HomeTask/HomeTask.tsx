import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'

import { API_SUCCESS, API_FAILED, API_FETCHING } from '@ib/api-constants'

import { toastTypes } from '../../../Common/constants/ToastTypes'
import { showToast } from '../../../Common/utils/ToastUtils/ToastUtil'
import Loader from '../../../Common/components/Loader'
import colors from '../../../Common/themes/Colors'
import ColumnsStore from '../../stores/ColumnsStore'
import {
   CHECKBOX_GROUP,
   MULTI_SELECT_FIELD,
   IMAGE_UPLOADER
} from '../../constants/FieldTypesConstants'
import HomeTaskOverViewModel from '../../stores/models/HomeTaskOverViewModel'
import {
   TaskId,
   TaskOverViewFields,
   FieldDisplayName,
   FieldResponse,
   FieldResponseImg,
   Header,
   TaskOverview,
   Footer,
   TaskWrapper,
   TaskIdWrapper,
   ActionButton
} from './styledComponents'

interface HomeTaskProps {
   task: HomeTaskOverViewModel
   columnsStore: ColumnsStore
   getTaskDetails: (taskId: any) => void
}

@observer
class HomeTask extends Component<HomeTaskProps> {
   convertArrayOfStringsToStrings = data => {
      let response = ''
      data.forEach((str, index) => {
         if (data.length - 1 === index) response += str
         else response += `${str},`
      })
      return response
   }

   renderFieldResponse = (fieldType, fieldResponse) => {
      const { convertArrayOfStringsToStrings } = this
      switch (fieldType) {
         case MULTI_SELECT_FIELD:
            return (
               <FieldResponse>
                  {convertArrayOfStringsToStrings(JSON.parse(fieldResponse))}
               </FieldResponse>
            )
         case CHECKBOX_GROUP:
            return (
               <FieldResponse>
                  {convertArrayOfStringsToStrings(JSON.parse(fieldResponse))}
               </FieldResponse>
            )
         case IMAGE_UPLOADER:
            return <FieldResponseImg src={fieldResponse} alt={''} />
         default:
            return <FieldResponse>{fieldResponse}</FieldResponse>
      }
   }

   getLightColor = randomColor => {
      const red = parseInt(`0x${randomColor.slice(1, 3)}`)
      const green = parseInt(`0x${randomColor.slice(3, 5)}`)
      const blue = parseInt(`0x${randomColor.slice(5, 7)}`)
      return `rgba(${red},${green},${blue},0.1)`
   }
   renderHeader = randomColor => {
      const {
         stageWithActions: { stageDisplayName }
      } = this.props.task

      const background = this.getLightColor(randomColor)
      return (
         <Header
            color={randomColor}
            background={background}
            displayName={stageDisplayName}
            onClick={this.getTaskDetails}
         >
            {stageDisplayName}
         </Header>
      )
   }
   onClickAction = async actionId => {
      // await getTaskActionResponse(taskId, actionId)
      const getTaskActionsAPIStatus = 100
      if (getTaskActionsAPIStatus === API_SUCCESS) {
         const toastProps = {
            message: 'SUCCESS',
            type: toastTypes.success
         }
         showToast(toastProps)
      }
      if (getTaskActionsAPIStatus === API_FAILED) {
         const toastProps = {
            message: 'FAILED',
            type: toastTypes.warning
         }
         showToast(toastProps)
      }
   }
   renderFooter = () => {
      const {
         stageWithActions: { actions }
      } = this.props.task
      const getTaskActionsAPIStatus = 200
      //FIXME:getTaskActionsAPIStatus from action model
      return (
         <Footer>
            {actions.map(action => (
               <ActionButton
                  key={action.actionId}
                  onClick={() => this.onClickAction(action.actionId)}
                  color={action.buttonColor}
               >
                  {getTaskActionsAPIStatus === API_FETCHING ? (
                     <Loader type='Oval' height={15} color={colors.white} />
                  ) : (
                     action.buttonText
                  )}
               </ActionButton>
            ))}
         </Footer>
      )
   }

   getRandomColor = () => {
      const letters = '0123456789ABCDEF'
      let color = '#'
      for (let i = 0; i < 6; i++) {
         color += letters[Math.floor(Math.random() * 16)]
      }
      return color
   }

   getTaskDetails = () => {
      const {
         task: { taskId },
         getTaskDetails
      } = this.props
      getTaskDetails(taskId)
   }

   render() {
      const { task } = this.props
      const {
         task: {
            stageWithActions: { stageDisplayName }
         }
      } = this.props
      const randomColor = this.getRandomColor()
      return (
         <TaskWrapper displayName={stageDisplayName} color={randomColor}>
            {this.renderHeader(randomColor)}
            <TaskOverview onClick={this.getTaskDetails}>
               <TaskIdWrapper>
                  <TaskId>{task.taskId}</TaskId>
               </TaskIdWrapper>
               {task.taskOverViewFields.map(taskOverViewField => (
                  <TaskOverViewFields key={taskOverViewField.fieldDisplayName}>
                     <FieldDisplayName>
                        {taskOverViewField.fieldDisplayName}
                     </FieldDisplayName>

                     {this.renderFieldResponse(
                        taskOverViewField.fieldType,
                        taskOverViewField.fieldResponse
                     )}
                  </TaskOverViewFields>
               ))}
            </TaskOverview>
            {this.renderFooter()}
         </TaskWrapper>
      )
   }
}

export default HomeTask
