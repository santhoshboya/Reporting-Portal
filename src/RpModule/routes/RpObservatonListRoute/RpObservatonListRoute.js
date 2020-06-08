import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import {
   RP_OBSERVATION_PATH,
   RP_OBSERVATION_SCREEN_PATH,
   OBSERVATIONS_ASSIGNED_TO_RP,
   OBSERVATION_SCREEN_PATH,
   RP_OBSERVATION_LIST_PATH
} from '../../constants/RouteConstants'
import { RpObservatonListPage } from '../../components/RpObservatonListPage'
import { toJS } from 'mobx'

import strings from '../../../common/i18n/strings.json'

@inject('rpStore')
@observer
class RpObservatonListRoute extends Component {
   constructor(props) {
      super(props)
   }

   componentDidMount = () => {
      this.doNetworkCalls()
   }

   getRpStore = () => {
      return this.props.rpStore
   }

   doNetworkCalls = () => {
      this.getRpStore().getObservationList()
   }
   onClickAddNew = () => {
      const { history } = this.props
      history.push(RP_OBSERVATION_PATH)
   }
   onSuccess = () => {
      //alert("data recieved")
   }
   onFailure = () => {
      //alert("data recieved")
   }
   navigateTOPage = page => {
      const { myObservations } = strings.rpFeatures
      const { history } = this.props
      if (page === myObservations) history.push(RP_OBSERVATION_LIST_PATH)
      else history.push(OBSERVATIONS_ASSIGNED_TO_RP)
   }
   onClickObservation = observationId => {
      this.props.history.push({
         pathname: `${OBSERVATION_SCREEN_PATH}${observationId}`,
         state: {
            userType: 'user',
            currentPage: strings.rpFeatures.myObservations
         }
      })
   }
   filterObservationList = value => {
      this.props.rpStore.filterObservationList(toJS(value).value)
   }

   render() {
      const {
         observationList,
         goToPreviousPage,
         goToNextPage,
         goToRandomPage,
         totalPages,
         currentPage,
         reportedOnSort,
         dueDateOnSort,
         userType,
         filterType,
         getObservationListAPIStatus,
         getObservationListAPIError
      } = this.getRpStore()

      console.log(2367890000009874, this.props.rpStore.observationList)
      return (
         <RpObservatonListPage
            handleClick={this.onClickAddNew}
            observationList={observationList}
            onClickObservation={this.onClickObservation}
            goToPreviousPage={goToPreviousPage}
            goToNextPage={goToNextPage}
            goToRandomPage={goToRandomPage}
            totalPages={totalPages}
            currentPage={currentPage}
            filterObservationList={this.filterObservationList}
            userType={userType}
            navigateTOPage={this.navigateTOPage}
            filterType={filterType}
            getObservationListAPIStatus={getObservationListAPIStatus}
            getObservationListAPIError={getObservationListAPIError}
            onRetryClick={this.doNetworkCalls}
            reportedOnSort={reportedOnSort}
            dueDateOnSort={dueDateOnSort}
         />
      )
   }
}
withRouter(RpObservatonListRoute)
export { RpObservatonListRoute }
