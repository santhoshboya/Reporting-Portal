import React from 'react'
import { useDrop } from 'react-dnd'
import { observer } from 'mobx-react'
import { withTranslation, WithTranslation } from 'react-i18next'

import Colors from '../../../../Common/themes/Colors'
import ArrowCircleUpIcon from '../../../../Common/icons/ArrowCircleUpIcon'

import TaskOverviewActionModel from '../../../stores/models/TaskOverviewActionModel'
import { itemTypes } from '../../../constants/TaskActionConstants'

import TaskOverview from '../../TaskOverview'

import {
   Container,
   TargetWrapper,
   BoxTitle,
   BoxPlaceHolder
} from './styledComponents'

interface Props extends WithTranslation {
   action: TaskOverviewActionModel
   selectedActionId: string | null
   changeDraggedItem: Function
   draggedItem: any
}

const TargetBox: React.FC<Props> = observer(
   ({ action, selectedActionId, changeDraggedItem, draggedItem, t }) => {
      const { name, id } = action
      const [{ isActive, result }, drop] = useDrop({
         accept: itemTypes.action,
         drop: () => ({ id: id }),
         collect: monitor => ({
            isActive: monitor.canDrop() && monitor.isOver(),
            result: monitor.getItem()
         })
      })

      if (result) {
         changeDraggedItem(result)
      }

      const renderTargetBox = (): JSX.Element =>
         draggedItem && selectedActionId === action.id ? (
            <TaskOverview
               task={draggedItem.task}
               onDrag={draggedItem.onDrag}
               onDrop={draggedItem.onDrop}
            />
         ) : (
            <>
               <ArrowCircleUpIcon
                  fill={isActive ? Colors.primary500Default : Colors.basic500}
               />
               <BoxPlaceHolder isActive={isActive}>
                  &nbsp;
                  {t('workflowManagement:targetBox.placeholder', {
                     target: name
                  })}
               </BoxPlaceHolder>
            </>
         )

      return (
         <Container>
            <BoxTitle>{name}</BoxTitle>
            <TargetWrapper
               ref={drop}
               isActive={isActive}
               data-testid={`target-${action.id}`}
            >
               {renderTargetBox()}
            </TargetWrapper>
         </Container>
      )
   }
)
export default withTranslation()(TargetBox)
