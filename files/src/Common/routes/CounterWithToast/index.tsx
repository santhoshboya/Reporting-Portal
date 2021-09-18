import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Link } from 'react-router-dom'

import { showToast } from '../../utils/ToastUtils/ToastUtil'
import CounterStore from '../../stores/CounterStore'
import { toastTypes } from '../../constants/ToastTypes'
import TaskTemplateStore from '../../../WorkflowManagement/stores/TaskTemplateStore'
import TaskStore from '../../../WorkflowManagement/stores/TaskStore'
import FileUploadField from '../../components/FileUploadField'
import SearchableDropDownComponent from '../../components/APIsearchableDropDown/'

interface CounterWithToastProps {
   counterStore: CounterStore
}

interface InjectedProps extends CounterWithToastProps {
   taskTemplateStore: TaskTemplateStore
   taskStore: TaskStore
}

@inject('counterStore', 'taskTemplateStore', 'taskStore')
@observer
class CounterWithToast extends Component<CounterWithToastProps> {
   async componentDidMount() {
      await this.getTaskTemplateStore().getTaskTemplates()
      const taskTemplate = this.getTaskTemplateStore().getTaskTemplate('FIN_PR')
      this.getTaskStore().createNewTask(taskTemplate)
   }
   getInjectedProps = (): InjectedProps => this.props as InjectedProps

   getTaskTemplateStore = () => this.getInjectedProps().taskTemplateStore
   getTaskStore = () => this.getInjectedProps().taskStore
   handleIncrement = () => {
      const { counterStore } = this.props
      counterStore.incrementCounter()

      const toastProps = {
         message:
            'All the Infinity Stones were acquired from Thanos with help of Scott',
         type: toastTypes.success,
         title: 'Infinity Stones Acquired'
      }

      showToast(toastProps)
   }

   handleDecrement = () => {
      const { counterStore } = this.props
      if (counterStore.count !== 0) {
         counterStore.decrementCounter()
         toast(`Count has been decremented by 1`)
      } else {
         toast(`Count is 0 and it can't be decremented`)
      }
   }

   render() {
      const { counterStore } = this.props
      return (
         <div>
            <h1>{counterStore.count}</h1>
            <button onClick={this.handleIncrement}>+</button>
            <button onClick={this.handleDecrement}>-</button>
            <FileUploadField
               fileAcceptType={['.png', '.pdf']}
               extraBucketPath=''
            />

            <SearchableDropDownComponent
               url={'gtrg'}
               placeholder={'dropdown'}
            />

            <Link to='/'>
               <p>Home</p>
            </Link>
         </div>
      )
   }
}

export default CounterWithToast
