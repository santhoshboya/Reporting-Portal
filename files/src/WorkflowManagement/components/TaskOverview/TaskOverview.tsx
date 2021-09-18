import React from 'react'
import { observer } from 'mobx-react'
import { useDrag } from 'react-dnd'

import { itemTypes } from '../../constants/TaskActionConstants'
import TaskOverviewModel from '../../stores/models/TaskOverviewModel'

import TaskOverviewField from '../TaskOverviewField'

import { types, sizes } from '../../../Common/components/Button/constants'
import { TaskCard, TaskWrapper, TaskButton, Wrapper } from './styledComponents'

export interface SourceBoxProps {
   task: TaskOverviewModel
   onDrop: (id: string | null) => void
   onDrag: Function
   onClickTask?: (id: string) => void
}

function getFeilds(fields, taskId) {
   const profile = fields.find(field => field.name === 'profile')
   return (
      <>
         {fields.map(
            field =>
               field.name !== 'profile' && (
                  <TaskOverviewField key={field.id} field={field} />
               )
         )}
         <Wrapper>
            {profile ? (
               <TaskOverviewField key={profile.id} field={profile} />
            ) : null}

            <TaskButton size={sizes.small} type={types.outline}>
               {taskId}
            </TaskButton>
         </Wrapper>
      </>
   )
}

function getRandomColor() {
   const letters = '0123456789ABCDEF'
   let color = '#'
   for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
   }
   return color
}

export const TaskOverview: React.FC<SourceBoxProps> = observer(
   ({ onDrag, task, onDrop, onClickTask }) => {
      const { fields } = task
      const [{ isDragging }, drag] = useDrag({
         item: { task, onDrag, onDrop, type: itemTypes.action },
         end: (item, monitor) => {
            const dropResult = monitor.getDropResult()
            if (item) {
               const id = dropResult ? dropResult.id : null
               onDrop(id)
            }
         },
         collect: monitor => ({
            isDragging: monitor.isDragging()
         })
      })

      if (isDragging) {
         onDrag(task)
      }
      const onClick = () => {
         onClickTask && onClickTask(task.id)
      }

      return (
         <TaskWrapper
            onClick={onClick}
            ref={drag}
            data-testid={`draggable-task${task.id}`}
         >
            <TaskCard enableShadow={true} color={getRandomColor()}>
               {getFeilds(fields, task.id)}
            </TaskCard>
         </TaskWrapper>
      )
   }
)

export default TaskOverview
