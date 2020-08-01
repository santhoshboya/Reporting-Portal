import React, { Component } from 'react'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import Columns from 'react-columns'
import { API_SUCCESS } from '@ib/api-constants'

import Loader from '../../../Common/components/Loader'
import InfiniteScrollList from '../../../Common/components/InfiniteScrollList'
import LoadingWrapper from '../../../Common/components/LoadingWrapper'
import NoDataView from '../../../Discussions/components/NoDataView'
import HomeTasksStore from '../../stores/HomeTasksStore'
import ColumnsStore from '../../stores/ColumnsStore'
import HomeTask from '../HomeTask'
import { Wrapper, ProjectHomeWrapper, Title } from './styledComponents'
import './styles.css'
interface ProjectHomeTasksProps {
   homeTasksStore: HomeTasksStore
   columnsStore: ColumnsStore
   getTaskDetails: (taskId: any) => void
}

@observer
class ProjectHomeTasks extends Component<ProjectHomeTasksProps> {
   @observable hasMore = true

   componentDidMount() {
      this.doHomeTaskNetworkCall()
   }

   doHomeTaskNetworkCall = async () => {
      const { getHomeTasks } = this.props.homeTasksStore

      await getHomeTasks()
      const { homeTasksArray } = this.props.homeTasksStore
      if (homeTasksArray.length < 30) this.hasMore = false
   }

   fetchMoreData = () => {
      const {
         getMoreHomeTasks,
         homeTasksArray,
         totalTasks
      } = this.props.homeTasksStore
      if (homeTasksArray.length >= totalTasks) {
         this.hasMore = false
         return
      }

      getMoreHomeTasks()
   }

   renderLoader = () => (
      <div
         style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center'
         }}
      >
         <Loader type='Oval' height={30} width={30} />
      </div>
   )

   renderHomeTasks = () => {
      const { homeTasksArray } = this.props.homeTasksStore
      const { columnsStore, getTaskDetails } = this.props
      const queries = [
         {
            columns: 1,
            query: 'max-width: 600px'
         },
         {
            columns: 2,
            query: 'min-width: 700px'
         },
         {
            columns: 3,
            query: 'min-width: 1000px'
         },
         {
            columns: 4,
            query: 'min-width: 1200px'
         },
         {
            columns: 5,
            query: 'min-width:1500px'
         },
         {
            columns: 6,
            query: 'min-width:1800px'
         }
      ]

      return (
         <Columns queries={queries} className='columns-styles'>
            {homeTasksArray.map(task => (
               <HomeTask
                  key={task.taskId}
                  task={task}
                  columnsStore={columnsStore}
                  getTaskDetails={getTaskDetails}
               />
            ))}
         </Columns>
      )
   }
   //TODO:text replace with i18n
   renderTasks = observer(() => {
      const { homeTasksArray } = this.props.homeTasksStore
      if (homeTasksArray.length === 0) {
         return <NoDataView />
      }
      return (
         <>
            <Title>Agenda for you</Title>
            <Wrapper>
               <InfiniteScrollList
                  dataLength={homeTasksArray.length}
                  next={this.fetchMoreData}
                  hasMore={this.hasMore}
                  loader={this.renderLoader()}
               >
                  {this.renderHomeTasks()}
               </InfiniteScrollList>
            </Wrapper>
         </>
      )
   })

   getAPIStatus = () => {
      const { homeTasksArray, getHomeTaskAPIStatus } = this.props.homeTasksStore

      if (homeTasksArray.length) {
         return API_SUCCESS
      }
      return getHomeTaskAPIStatus
   }

   render() {
      const { getHomeTasksAPIError } = this.props.homeTasksStore
      const { getAPIStatus } = this
      return (
         <ProjectHomeWrapper>
            <LoadingWrapper
               apiStatus={getAPIStatus()}
               apiError={getHomeTasksAPIError as Error}
               onRetry={this.doHomeTaskNetworkCall}
               renderSuccessView={this.renderTasks}
            />
         </ProjectHomeWrapper>
      )
   }
}

export default ProjectHomeTasks
