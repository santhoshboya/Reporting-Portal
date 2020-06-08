import React, { Component } from 'react'
import { RpObservationPage } from '../../components/RpObservationPage'
import { observable, action, toJS } from 'mobx'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
@inject('rpStore')
@observer
class RpObservationRoute extends Component {
   @observable titleOfTheObservation = null
   @observable cateogary = null
   @observable subCateogary = null
   @observable severity = null
   @observable description = null
   @observable attachments = null
   @observable titleErrorMsg = ''
   @observable severityErrorMsg = ''
   @observable descriptionErrorMsg = ''

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
      this.props.rpStore.getCateogaries(
         {},
         () => {},
         () => {}
      )
   }

   @action.bound onChangeTitleOfTheObservation(event) {
      this.titleOfTheObservation = event.target.value
      if (this.titleOfTheObservation === '')
         this.titleErrorMsg = 'Please enter title'
      else this.titleErrorMsg = ''
   }

   @action.bound onChangeCateogary(value) {
      this.cateogary = toJS(value).value

      this.props.rpStore.cateogary = toJS(value).value
   }

   @action.bound onChangeSubCateogary(value) {
      this.subCateogary = toJS(value).value
   }

   @action.bound onChangeSeverity(value) {
      this.severity = toJS(value).value
      if (this.severity === '') this.severityErrorMsg = 'Please select severty'
      else this.severityErrorMsg = ''
   }

   @action.bound onChangeDescription(event) {
      this.description = event.target.value
      if (this.description === '')
         this.descriptionErrorMsg = 'Please enter description'
      else this.descriptionErrorMsg = ''
   }

   @action.bound onHandleErrorMsg() {
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
      const { cateogaries } = this.props.rpStore
      let category_id
      let sub_category_id
      if (cateogaries.length > 1) {
         let temp = cateogaries.find(
            cateogary => cateogary.name === this.cateogary
         )
         if (temp) category_id = temp.category_id
         else return [0, 0]

         cateogaries.forEach(cateogary => {
            if (cateogary.name === this.cateogary) {
               sub_category_id = cateogary.sub_categories.find(
                  subCateogary => subCateogary.name === this.subCateogary
               ).sub_category_id
               console.log(cateogary, 999999999999999)
            }
         })
         return [category_id, sub_category_id]
      }
      return [0, 0]
   }

   @action.bound onClickSubmit() {
      if (this.onHandleErrorMsg()) {
         let categoriesIds = this.getCategoryAndSubCategoryId()
         const observation = {
            title: this.titleOfTheObservation,
            category_id: categoriesIds[0],
            sub_category_id: categoriesIds[1],
            severity: this.severity,
            description: this.description,
            attachments: []
         }
         this.props.rpStore.addNewObservation(
            observation,
            this.onSuccess,
            this.onFailure
         )
         this.init()
         this.props.history.goBack()
      }
   }
   goBack = () => {
      this.props.history.goBack()
   }
   onSuccess() {
      //alert("observation submitted successfully...")
   }
   onFailure() {
      // alert("something went wrong pls try again...")
   }

   render() {
      const {
         getPostObservationAPIStatus,
         cateogaries,
         getSubCateogaries,
         cateogariesList
      } = this.props.rpStore
      return (
         <RpObservationPage
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
            getSubCateogaries={getSubCateogaries}
            cateogariesList={cateogariesList}
         />
      )
   }
}
withRouter(RpObservationRoute)
export { RpObservationRoute }
