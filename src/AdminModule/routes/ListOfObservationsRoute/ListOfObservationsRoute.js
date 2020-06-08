import React, { Component } from 'react'
import { ListOfObservations } from '../../components/ListOfObservations'
import { observable, toJS } from 'mobx'
import { inject, observer } from 'mobx-react'
import { OBSERVATION_SCREEN_PATH } from '../../constants/RouteConstants'

@inject('adminStore')
@observer
class ListOfObservationsRoute extends Component {
   constructor(props) {
      super(props)
   }

   componentDidMount = () => {
      this.doNetworkCalls()
   }

   getAdminStore = () => {
      return this.props.adminStore
   }

   doNetworkCalls = () => {
      this.getAdminStore().getCateogaries(
         {},
         () => {},
         () => {}
      )

      this.getAdminStore().getAdminObservationList()
   }

   onSuccess = () => {}
   onFailure = () => {}
   onClickObservation = observationId => {
      console.log(this.props, 567890)

      this.props.history.push({
         pathname: `${OBSERVATION_SCREEN_PATH}${observationId}`,
         state: { userType: 'Admin', currentPage: 'Total Observations' }
      })
   }
   filterCategory = value => {
      console.log(12243, value)
      this.getAdminStore().filterCategory(value)
   }
   filterSubCategory = value => {
      this.getAdminStore().filterSubCategory(value)
   }
   setStatusFilterOfList = value => {
      this.getAdminStore().setStatusFilterOfList(value)
   }
   dueDateSortOfList = () => {
      this.props.adminStore.dueDateOnSort()
      this.getAdminStore().getAdminObservationList()
   }
   navigateTOPage = () => {}

   render() {
      const {
         adminObservationsList,
         goToPreviousObservations,
         goToNextObservations,
         goToRandomObservations,
         listOfObservationsTotalPages,
         listOfObservationsCurrentPage,
         userType,
         categotyFilterType,
         subCategotyFilterType,
         adminObservationsListAPIStatus,
         adminObservationsListAPIError,
         cateogaries,
         getSubCateogaries,
         cateogariesList,
         getSubCateogariesMultiple,
         statusFilterOfList
      } = this.getAdminStore()

      return (
         <ListOfObservations
            observationList={adminObservationsList}
            onClickObservation={this.onClickObservation}
            goToPreviousPage={goToPreviousObservations}
            goToNextPage={goToNextObservations}
            goToRandomPage={goToRandomObservations}
            totalPages={listOfObservationsTotalPages}
            currentPage={listOfObservationsCurrentPage}
            filterCategory={this.filterCategory}
            filterSubCategory={this.filterSubCategory}
            userType={userType}
            navigateTOPage={this.navigateTOPage}
            categotyFilterType={categotyFilterType}
            subCategotyFilterType={subCategotyFilterType}
            adminObservationsListAPIError={adminObservationsListAPIError}
            adminObservationsListAPIStatus={adminObservationsListAPIStatus}
            onRetryClick={this.doNetworkCalls}
            cateogaries={cateogaries}
            getSubCateogaries={getSubCateogaries}
            cateogariesList={cateogariesList}
            getSubCateogariesMultiple={getSubCateogariesMultiple}
            statusFilterOfList={statusFilterOfList}
            setStatusFilterOfList={this.setStatusFilterOfList}
            dueDateOnSort={this.dueDateSortOfList}
         />
      )
   }
}
export { ListOfObservationsRoute }
