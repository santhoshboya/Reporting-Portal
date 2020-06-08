import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import {
   RP_OBSERVATION_PATH,
   RP_OBSERVATION_SCREEN_PATH,
   RP_OBSERVATION_LIST_PATH,
   OBSERVATIONS_ASSIGNED_TO_RP,
   OBSERVATION_SCREEN_PATH
} from '../../constants/RouteConstants'
import { ObservationsAssignedToRp } from '../../components/ObservationsAssignedToRp'
import { toJS } from 'mobx'
import strings from '../../../common/i18n/strings.json'

@inject('rpStore')
@observer
class ObservationsAssignedToRpRoute extends Component {
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
      this.getRpStore().getAssignedObservationList()
   }
   onClickAddNew = () => {
      const { history } = this.props
      history.push(RP_OBSERVATION_PATH)
   }
   onSuccess = () => {
      //alert("data recieved")
   }
   onFailure = () => {
      // alert("data recieved")
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
         state: { userType: 'Rp', currentPage: 'Assigned To Me' }
      })
   }
   filterAssignedObservationList = value => {
      this.props.rpStore.filterAssignedObservationList(toJS(value).value)
   }

   render() {
      const {
         assignedObservationListForRp,
         assignedObservationsGoToPreviousPage,
         assignedObservationsGoToNextPage,
         assignedObservationsCurrentPage,
         filterTypeOfAssignedObservation,
         assignedObservationsTotalPages,
         assignedObservationsGoToRandomPage,
         assignedObservationsReportedOnSort,
         assignedObservationsDueDateOnSort,
         assignedObservationAPIStatus,
         assignedObservationAPIError,
         userType
      } = this.getRpStore()
      console.log(12345, assignedObservationAPIStatus, userType)
      return (
         <ObservationsAssignedToRp
            filterAssignedObservationList={this.filterAssignedObservationList}
            filterTypeOfAssignedObservation={filterTypeOfAssignedObservation}
            handleClick={this.onClickAddNew}
            observationList={assignedObservationListForRp}
            onClickObservation={this.onClickObservation}
            assignedObservationsGoToPreviousPage={
               assignedObservationsGoToPreviousPage
            }
            assignedObservationsGoToNextPage={assignedObservationsGoToNextPage}
            currentPage={assignedObservationsCurrentPage}
            totalPages={assignedObservationsTotalPages}
            assignedObservationsGoToRandomPage={
               assignedObservationsGoToRandomPage
            }
            userType={userType}
            navigateTOPage={this.navigateTOPage}
            assignedObservationsReportedOnSort={
               assignedObservationsReportedOnSort
            }
            assignedObservationsDueDateOnSort={
               assignedObservationsDueDateOnSort
            }
            onRetryClick={this.doNetworkCalls}
            assignedObservationAPIStatus={assignedObservationAPIStatus}
            assignedObservationAPIError={assignedObservationAPIError}
         />
      )
   }
}
withRouter(ObservationsAssignedToRpRoute)
export { ObservationsAssignedToRpRoute }
