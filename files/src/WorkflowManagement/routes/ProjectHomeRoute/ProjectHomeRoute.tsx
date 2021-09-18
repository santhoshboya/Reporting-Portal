import React, { Component } from 'react'

import { observer, inject } from 'mobx-react'

import HomeTasksStore from '../../stores/HomeTasksStore'
import ProjectHomeTasks from '../../components/ProjectHomeTasks'
import ColumnsStore from '../../stores/ColumnsStore'
import WithSlimbarControllerRoute, {
   routeInfo
} from '../../../hocs/withSlimbarControllerRoute/withSlimbarControllerRoute'
import WorkflowUiStore from '../../stores/WorkflowUiStore'
import TaskStore from '../../stores/TaskStore'

interface InjectedProps {
   homeTaskStore: HomeTasksStore
   columnsStore: ColumnsStore
   workflowUiStore: WorkflowUiStore
   taskStore: TaskStore
}
@inject('homeTaskStore', 'columnsStore', 'workflowUiStore', 'taskStore')
@observer
class ProjectHomeRoute extends Component {
   getInjectedProps = () => this.props as InjectedProps

   getHomeTasksStore = () => this.getInjectedProps().homeTaskStore

   getColumnsStore = () => this.getInjectedProps().columnsStore

   getWorkflowUiStore = () => this.getInjectedProps().workflowUiStore

   getTaskStore = () => this.getInjectedProps().taskStore

   getTaskDetails = taskId => {
      const { setUpdateTaskModalOpen } = this.getWorkflowUiStore()
      const { onChangeSelectedTaskId } = this.getTaskStore()
      onChangeSelectedTaskId(taskId)
      setUpdateTaskModalOpen()
   }

   render() {
      const homeTasksStore = this.getHomeTasksStore(),
         columnsStore = this.getColumnsStore(),
         workflowUiStore = this.getWorkflowUiStore()

      return (
         <ProjectHomeTasks
            homeTasksStore={homeTasksStore}
            columnsStore={columnsStore}
            getTaskDetails={this.getTaskDetails}
         />
      )
   }
}

export default WithSlimbarControllerRoute(ProjectHomeRoute, {
   defaultActiveSlimbarCollapsedId: routeInfo.home,
   defaultIsExpanded: false
})
