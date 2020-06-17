import React, { Component } from 'react'
import { observable, action, toJS } from 'mobx'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { ObservationScreen } from '../../../common/components/ObservationScreen'
import {
   RP_OBSERVATION_LIST_PATH,
   USER_OBSERVATION_LIST_PATH,
   LIST_OF_OBSERVATIONS_PATH,
   OBSERVATIONS_ASSIGNED_TO_RP
} from '../../constants/RouteConstants'
import strings from '../../../common/i18n/strings.json'
import { getLoadingStatus } from '@ib/api-utils'
const ADMIN = 'Admin'
@inject('userStore')
@observer
class UserObservationScreenRoute extends Component {
   @observable titleOfTheObservation = null
   @observable description = null
   @observable cateogary = null
   @observable subCateogary = null
   @observable status = null
   @observable severity = null
   @observable attachments = null
   @observable assignedTO = null
   @observable reportedOn = null
   @observable dueDate = null
   @observable privacy = null
   constructor(props) {
      super(props)
      this.init()
   }

   init = () => {
      this.assignedTO = ''
      this.status = ''
      this.dueDate = ''
      this.privacy = null
      this.cateogary = ''
      this.subCateogary = null
   }
   componentDidMount = () => {
      this.doNetworkCalss()
   }
   doNetworkCalss = () => {
      const { id } = this.props.match.params

      this.props.userStore.getObservation(id, this.onSuccess, this.onFailure)
      this.props.userStore.getCateogaries(
         {},
         () => {},
         () => {}
      )
   }

   @action.bound onChangePrivacy(value) {
      this.privacy = value
   }

   @action.bound onChangeAssignedTO(value) {
      this.assignedTO = toJS(value).value
   }

   @action.bound onChangeDueDate(value) {
      this.dueDate = value
   }

   @action.bound onChangeStatus(value) {
      this.status = toJS(value).value
   }

   @action.bound onChangeCategory(value) {
      this.cateogary = toJS(value).value
      this.subCateogary = null
      this.props.userStore.cateogary = toJS(value).value
   }
   @action.bound onChangeSubCategory(value) {
      this.subCateogary = toJS(value).value
   }

   @action.bound onChangeDescription(value) {
      this.description = value
      console.log(value)
   }

   @action.bound onReset() {
      const { userType } = this.props.userStore
      if (userType == ADMIN) {
         this.cateogary = ''
         this.subCateogary = null
      } else {
         this.assignedTO = ''
         this.status = ''
         this.dueDate = ''
         this.privacy = null
      }
   }
   goBack = () => {
      this.props.history.goBack()
   }
   onSuccess = () => {
      const {
         assigned_to,
         status,
         due_date_type,
         due_date,
         category,
         sub_category
      } = this.props.userStore.observationDetails
      if (assigned_to) this.assignedTO = assigned_to.first_name

      this.status = status
      if (due_date) this.dueDate = due_date

      if (category) {
         this.cateogary = category.name
         this.subCateogary = sub_category.name
      }
      this.privacy = due_date_type
   }
   onFailure = () => {
      alert('hi')
   }
   navigateTOPage = page => {
      const {
         totalObservations,
         categories,
         myObservations,
         assignedToMe
      } = strings.rpFeatures
      switch (page) {
         case totalObservations:
            this.props.history.push(`${LIST_OF_OBSERVATIONS_PATH}`)
            break
         case myObservations:
            this.props.history.push(`${RP_OBSERVATION_LIST_PATH}`)
            break
         case assignedToMe:
            this.props.history.push(`${OBSERVATIONS_ASSIGNED_TO_RP}`)
            break
         case categories:
            break
      }
   }
   updationFail = () => {}

   @action.bound onUpdate = async () => {
      const { id } = this.props.match.params
      let typeOfUser = this.props.location.state.userType
      let observation
      if (typeOfUser === ADMIN) {
         observation = {
            observation_id: id,
            category_id: this.getCategoryAndSubCategoryId()[0],
            sub_category_id: this.getCategoryAndSubCategoryId()[1]
         }
      } else {
         let due_date = null
         if (this.dueDate)
            due_date = `${this.dueDate.slice(0, 10)} ${this.dueDate.slice(11)}`
         observation = {
            observation_id: id,
            status: this.status,
            due_date: due_date,
            assigned_to_id: this.getAssignedToId(),
            due_date_type: this.privacy
         }
      }

      await this.props.userStore.updateObservationDeatails(
         this.updationFail,
         typeOfUser,
         observation
      )

      if (this.props.userStore.updateObservationAPIError != null) {
      }
      this.init()
      this.props.history.goBack()
   }

   getAssignedToId = () => {
      if (this.assignedTO != '') {
         return this.props.userStore.rpList.find(
            rp => rp.first_name === this.assignedTO
         ).user_id
      }
   }
   getCategoryAndSubCategoryId = () => {
      if (this.cateogary == null) return [0, 0]
      const { cateogaries } = this.props.userStore
      let category_id = 0
      let sub_category_id = 0
      let category = cateogaries.find(
         cateogary => cateogary.name === this.cateogary
      )
      if (category) category_id = category.category_id
      cateogaries.forEach(cateogary => {
         if (cateogary.name === this.cateogary) {
            cateogary.sub_categories.forEach(subCateogary => {
               if (subCateogary.name === this.subCateogary)
                  sub_category_id = subCateogary.sub_category_id
            })
         }
      })
      return [category_id, sub_category_id]
   }

   getComputedRpList = () => {
      let rpList = []
      this.props.userStore.rpList.forEach(rp => {
         rpList.push(rp.first_name)
      })
      return rpList
   }

   render() {
      const {
         title,
         severity,
         description,
         reported_on,
         attachments
      } = this.props.userStore.observationDetails
      const {
         getObservationAPIStatus,
         getCateogariesAPIStatus,
         getObservationAPIError,
         getCateogariesAPIError,
         cateogaries,
         getSubCateogaries,
         rpList,
         cateogariesList
      } = this.props.userStore
      const { userType, currentPage } = this.props.location.state

      const apiStatus = getLoadingStatus(
         getCateogariesAPIStatus,
         getObservationAPIStatus
      )
      return (
         <ObservationScreen
            userType={userType}
            currentPage={currentPage}
            title={title}
            rpList={this.getComputedRpList()}
            cateogaryOfObservation={this.cateogary}
            subCateogaryOfObservation={this.subCateogary}
            severityOfObservation={severity}
            reportedOnOfObservation={reported_on}
            descriptionOfObservation={description}
            attachmentsOfObservation={attachments}
            onChangePrivacy={this.onChangePrivacy}
            onChangeAssignedTO={this.onChangeAssignedTO}
            onChangeDueDate={this.onChangeDueDate}
            onChangeStatus={this.onChangeStatus}
            onUpdate={this.onUpdate}
            onChangeDescription={this.onChangeDescription}
            onChangeCategory={this.onChangeCategory}
            onChangeSubCategory={this.onChangeSubCategory}
            goBack={this.goBack}
            onReset={this.onReset}
            assignedToOfObservation={this.assignedTO}
            statusOfObservation={this.status}
            dueDateOfObservation={this.dueDate}
            privacyOfObservation={this.privacy}
            apiStatus={apiStatus}
            apiError={getObservationAPIError}
            onRetryClick={this.doNetworkCalss}
            navigateTOPage={this.navigateTOPage}
            cateogaries={cateogaries}
            getSubCateogaries={getSubCateogaries}
            cateogariesList={cateogariesList}
         />
      )
   }
}
withRouter(UserObservationScreenRoute)
export { UserObservationScreenRoute }
