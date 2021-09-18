import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { RouteComponentProps } from 'react-router-dom'
import { observable } from 'mobx'
import { History } from 'history'
import { withTranslation } from 'react-i18next'

import withTaskTemplates from '../../../Common/hocs/withTaskTemplates'
import TaskTemplateStore from '../../stores/TaskTemplateStore'
import UpdateTaskModel from '../../stores/models/UpdateTaskModel'
import TaskStore from '../../stores/TaskStore'
import Task from '../../components/Task'
import { WithTranslationProps } from '../../stores/types'
import UpdateTaskComponent from '../../components/UpdateTaskComponent'

interface ParamsProps {
   taskId: string
}
interface GetTaskRouteProps
   extends RouteComponentProps<ParamsProps>,
      WithTranslationProps {
   history: History
}
interface InjectedProps extends GetTaskRouteProps {
   taskTemplateStore: TaskTemplateStore
   taskStore: TaskStore
}

@inject('taskTemplateStore', 'taskStore')
@observer
class GetTaskRoute extends Component<GetTaskRouteProps> {
   @observable task: UpdateTaskModel | undefined
   @observable taskTemplate
   taskRef: React.RefObject<Task> = React.createRef()

   constructor(props) {
      super(props)
      const { match } = this.props
      const { taskId } = match.params
      this.getTaskStore().onChangeSelectedTaskId(taskId)
   }

   getInjectedProps = (): InjectedProps => this.props as InjectedProps
   getTaskTemplateStore = () => this.getInjectedProps().taskTemplateStore
   getTaskStore = () => this.getInjectedProps().taskStore

   render() {
      return (
         <UpdateTaskComponent
            taskTemplateStore={this.getTaskTemplateStore()}
            taskStore={this.getTaskStore()}
         />
      )
   }
}
export default withTranslation()(withTaskTemplates(GetTaskRoute))
