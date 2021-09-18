import React, { Component } from 'react'
import { UserObservationPage } from '../../components/UserObservationPage'
import { observable, action, toJS } from 'mobx'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { UserStore } from "../../stores/UserStore"
import {History} from 'history'

type UserObservationRouteProps={
   userStore:UserStore,
   history:History
}

@inject('userStore')
@observer
class UserObservationRoute extends Component <UserObservationRouteProps>{
   @observable titleOfTheObservation:string =""
   @observable cateogary :string =""
   @observable subCateogary :string =""
   @observable severity :string =""
   @observable description :string =""
   @observable attachments :Array<string>=[]
   @observable titleErrorMsg :string =""
   @observable severityErrorMsg :string =""
   @observable descriptionErrorMsg :string =""

   constructor(props) {
      super(props)
      this.init()
   }

   init = () => {
      this.titleOfTheObservation = ''
      this.cateogary = ''
      this.subCateogary = ''
      this.severity = ''
      this.description = ''
      this.attachments = []
   }
   componentDidMount = () => {
      this.props.userStore.getCateogaries(
         {},
         () => {},
         () => {}
      )
   }

   @action.bound onChangeTitleOfTheObservation(value) {
      this.titleOfTheObservation = value
      if (this.titleOfTheObservation === '')
         this.titleErrorMsg = 'Please enter title'
      else this.titleErrorMsg = ''
   }

   @action.bound onChangeCateogary(value) {
      this.cateogary = toJS(value).value

      this.props.userStore.cateogary = toJS(value).value
   }

   @action.bound onChangeSubCateogary(value) {
      this.subCateogary = toJS(value).value
   }

   @action.bound onChangeSeverity(value) {
      this.severity = toJS(value).value
      if (this.severity === '') this.severityErrorMsg = 'Please select severty'
      else this.severityErrorMsg = ''
   }

   @action.bound onChangeDescription(value) {
      this.description = value
      if (this.description === '')
         this.descriptionErrorMsg = 'Please enter description'
      else this.descriptionErrorMsg = ''
   }

   @action.bound onHandliErrorMsg() {
      this.titleErrorMsg = ''
      this.severityErrorMsg = ''
      this.descriptionErrorMsg = ''
      if (this.titleOfTheObservation === '')
         this.titleErrorMsg = 'Please enter title'
      if (this.severity === '') this.severityErrorMsg = 'Please select severty'
      if (this.description === '')
         this.descriptionErrorMsg = 'Please enter description'
      if (
         this.titleOfTheObservation !== '' &&
         this.severity !== '' &&
         this.description !== ''
      )
         return true
   }

   getCategoryAndSubCategoryId = () => {
      const { cateogaries } = this.props.userStore
      let category_id = 0
      let sub_category_id = 0
      if (cateogaries.length > 1) {
         let temp = cateogaries.find(
            cateogary => cateogary.name === this.cateogary
         )
         if (temp) category_id = temp.category_id
         else return [0, 0]

         cateogaries.forEach(cateogary => {
            if (cateogary.name === this.cateogary) {
               let temp2 = cateogary.sub_categories.find(
                  subCateogary => subCateogary.name === this.subCateogary
               )
               if (temp2) sub_category_id = temp2.sub_category_id
               else return [0, 0]
            }
         })
         return [category_id, sub_category_id]
      }
      return [0, 0]
   }

   @action.bound onClickSubmit() {
      if (this.onHandliErrorMsg()) {
         let categoriesIds = this.getCategoryAndSubCategoryId()

         const observation = {
            title: this.titleOfTheObservation,
            category_id: categoriesIds[0],
            sub_category_id: categoriesIds[1],
            severity: this.severity,
            description: this.description,
            attachments: []
         }

         this.props.userStore.addNewObservation(
            observation,
            this.onSuccess,
            this.onFailure
         )
         console.log('status', this.props.userStore.getPostObservationAPIStatus)

         this.init()
         this.props.userStore.getPostObservationAPIStatus = 200
         this.props.history.goBack()
      }
   }
   goBack = () => {
      this.props.history.goBack()
   }
   onSuccess() {
      alert('observation submitted successfully...')
   }
   onFailure() {
      alert('something went wrong pls try again...')
   }

   render() {
      const {
         getPostObservationAPIStatus,
         cateogaries,
         getSubCateogaries,
         cateogariesList
      } = this.props.userStore
      return (
         <UserObservationPage
            title={this.titleOfTheObservation}
            cateogaryOfObservation={this.cateogary}
            subCateogaryOfObservation={this.subCateogary}
            severityOfObservation={this.severity}
            descriptionOfObservation={this.description}
            attachmentsOfObservation={this.attachments}
            onClickSubmit={this.onClickSubmit}
            onChangeTitleOfTheObservation={this.onChangeTitleOfTheObservation}
            onChangeCateogary={this.onChangeCateogary}
            onChangeSubCateogary={this.onChangeSubCateogary}
            onChangeSeverity={this.onChangeSeverity}
            onChangeDescription={this.onChangeDescription}
            goBack={this.goBack}
            titleErrorMsg={this.titleErrorMsg}
            severityErrorMsg={this.severityErrorMsg}
            descriptionErrorMsg={this.descriptionErrorMsg}
            apiStatus={getPostObservationAPIStatus}
            cateogaries={cateogaries}
            cateogariesList={cateogariesList}
            getSubCateogaries={getSubCateogaries}
         />
      )
   }
}
withRouter(UserObservationPage)
export { UserObservationRoute }
