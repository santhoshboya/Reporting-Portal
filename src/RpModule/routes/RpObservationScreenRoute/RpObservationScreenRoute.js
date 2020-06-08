import React, { Component } from 'react'
import { observable, action, toJS } from 'mobx'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { ObservationScreen } from '../../../common/components/ObservationScreen'
@inject('rpStore')
@observer
class RpObservationScreenRoute extends Component {
   @observable dueDate = null
   @observable privacy = null
   @observable status = null
   @observable assignedTO = null
   cateogary = null
   subCateogary = null
   titleOfTheObservation = null
   attachments = null
   reportedOn = null

   constructor(props) {
      super(props)
      this.init()
      alert(2)
   }
   componentDidMount() {
      const { id } = this.props.match.params

      this.props.rpStore
         .getObservation({ id }, this.onSuccess, this.onFailure)
         .then(() => {
            const {
               assignedTO,
               status,
               privacy,
               dueDate
            } = this.props.rpStore.observationDetails
            console.log(123, privacy, assignedTO, status, dueDate)

            this.assignedTO = assignedTO
            this.status = status
            this.dueDate = privacy
            this.privacy = dueDate
         })
   }
   init = () => {
      this.assignedTO = ''
      this.status = ''
      this.dueDate = ''
      this.privacy = ''
   }

   @action.bound onChangePrivacy(event) {
      this.privacy = event.target.value
   }

   @action.bound onChangeAssignedTO(value) {
      this.assignedTO = toJS(value).value
   }

   @action.bound onChangeDueDate(event) {
      this.dueDate = event.target.value
   }

   @action.bound onChangeStatus(value) {
      this.status = toJS(value).value
      console.log(this.status)
   }

   @action.bound onChangeDescription(event) {
      this.description = event.target.value
      console.log(this.description)
   }

   @action.bound onReset() {
      this.init()
   }
   goBack = () => {
      this.props.history.goBack()
   }
   @action.bound onUpdate() {
      let { updateObservationAPIStatus } = this.props.rpStore
      updateObservationAPIStatus = 100
      setTimeout(() => {
         const observation = {
            description: this.description,
            status: this.status,
            subCateogary: this.subCateogary,
            dueDate: this.dueDate,
            assignedTO: this.assignedTO,
            privacy: this.privacy
         }
         this.props.rpStore.updateObservationDeatails(
            observation,
            this.onSuccess,
            this.onFailure
         )
         this.init()
         updateObservationAPIStatus = 200
         alert('observation updated successfully...')
         this.props.history.goBack()
      }, 500)
   }
   onFailure() {
      // alert("something went wrong pls try again...")
   }
   onSuccess() {
      //alert("observation updated successfully...")
   }

   render() {
      const {
         title,
         cateogary,
         subCateogary,
         severity,
         description,
         reportedOn,
         attachments
      } = this.props.rpStore.observationDetails

      const { userType } = this.props.rpStore
      const { updateObservationAPIStatus } = this.props.rpStore

      return (
         <ObservationScreen
            userType={userType}
            title={title}
            cateogaryOfObservation={cateogary}
            subCateogaryOfObservation={subCateogary}
            severityOfObservation={severity}
            reportedOnOfObservation={reportedOn}
            descriptionOfObservation={description}
            attachmentsOfObservation={attachments}
            onChangePrivacy={this.onChangePrivacy}
            onChangeAssignedTO={this.onChangeAssignedTO}
            onChangeDueDate={this.onChangeDueDate}
            onChangeStatus={this.onChangeStatus}
            onUpdate={this.onUpdate}
            onChangeDescription={this.onChangeDescription}
            goBack={this.goBack}
            onReset={this.onReset}
            assignedToOfObservation={this.assignedTO}
            statusOfObservation={this.status}
            dueDateOfObservation={this.dueDate}
            privacyOfObservation={this.privacy}
            apiStatus={updateObservationAPIStatus}
         />
      )
   }
}
withRouter(RpObservationScreenRoute)
export { RpObservationScreenRoute }
