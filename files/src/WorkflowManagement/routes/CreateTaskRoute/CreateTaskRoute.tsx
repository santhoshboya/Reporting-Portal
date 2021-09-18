import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { withTranslation } from 'react-i18next'

import withTaskTemplates from '../../../Common/hocs/withTaskTemplates'
import CreateTaskComponent from '../../components/CreateTaskComponent'
import TaskTemplateStore from '../../stores/TaskTemplateStore'
import TaskStore from '../../stores/TaskStore'
import { WithTranslationProps } from '../../stores/types'
import { CreateTaskWrapper } from './styledComponents'

interface InjectedProps extends WithTranslationProps {
   taskTemplateStore: TaskTemplateStore
   taskStore: TaskStore
}

@inject('taskTemplateStore', 'taskStore')
@observer
class CreateTaskRoute extends Component<WithTranslationProps> {
   getInjectedProps = (): InjectedProps => this.props as InjectedProps

   getTaskTemplateStore = () => this.getInjectedProps().taskTemplateStore

   getTaskStore = () => this.getInjectedProps().taskStore

   render() {
      return (
         <CreateTaskWrapper>
            <CreateTaskComponent
               taskTemplateStore={this.getTaskTemplateStore()}
               taskStore={this.getTaskStore()}
            />
         </CreateTaskWrapper>
      )
   }
}

export default withTranslation()(withTaskTemplates(CreateTaskRoute))
