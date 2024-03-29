import React, { Component } from 'react'
import { observer } from 'mobx-react'

import { DesktopLayoutMainPage } from '../../../common/components/DesktopLayoutMainPage'
import strings from '../../../common/i18n/strings.json'
import { Image } from '../../../common/components/Image'
import { InputField } from '../../../common/components/InputField'
import { DropDown } from '../../../common/components/DropDown'
import { TextArea } from '../../../common/components/TextArea'
import { PrimaryButton } from '../../../common/components/PrimaryButton'

import {
   ObservationForm,
   BackToObservationsLink,
   FieldContainer,
   FieldName,
   DragAndDrop,
   Required,
   InputAndErrorField
} from './styledComponent'
import './index.css'

import {UserObservationPageProps} from '../../../UserModule/components/UserObservationPage/UserObservationPage'

interface RpObservationPageProps extends UserObservationPageProps{

}

@observer
class RpObservationPage extends Component<RpObservationPageProps> {
   render() {
      const {
         onClickSubmit,
         title,
         cateogaryOfObservation,
         subCateogaryOfObservation,
         severityOfObservation,
         descriptionOfObservation,
         attachmentsOfObservation,
         onChangeTitleOfTheObservation,
         onChangeCateogary,
         onChangeSubCateogary,
         onChangeSeverity,
         onChangeDescription,
         goBack,
         cateogaries,
         getSubCateogaries,
         cateogariesList,
         titleErrorMsg,
         severityErrorMsg,
         descriptionErrorMsg,
         apiStatus
      } = this.props

      const {
         titleOfTheObservation,
         culturalDeviations,
         backToObservations,
         cateogary,
         severity,
         description,
         attachments,
         subCateogary,
         submit
      } = strings.usersScreen
      return (
         <DesktopLayoutMainPage>
            <ObservationForm>
               <BackToObservationsLink onClick={goBack}>
                  <Image
                     src={
                        'https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/24ef7d49-46b3-47e6-b835-579ee7a857d0.svg'
                     }
                  />
                  {backToObservations}
               </BackToObservationsLink>

               <FieldContainer>
                  <FieldName>
                     {titleOfTheObservation}
                     <Required>*</Required>
                  </FieldName>
                  <InputAndErrorField>
                     <InputField
                        testid={'title'}
                        className={'title'}
                        type={'text'}
                        value={title}
                        onHandleChange={onChangeTitleOfTheObservation}
                        placeHolder={culturalDeviations}
                     />
                     {titleErrorMsg !== '' && (
                        <Required>{titleErrorMsg}</Required>
                     )}
                  </InputAndErrorField>
               </FieldContainer>

               <FieldContainer>
                  <FieldName>{cateogary}</FieldName>
                  <DropDown
                     onSlectOption={onChangeCateogary}
                     value={cateogaryOfObservation}
                     options={cateogaries.length > 0 ? cateogariesList : []}
                  />
                  <FieldName>{subCateogary}</FieldName>
                  <DropDown
                     onSlectOption={onChangeSubCateogary}
                     value={subCateogaryOfObservation}
                     options={cateogaries.length > 0 ? getSubCateogaries : []}
                  />
               </FieldContainer>

               <FieldContainer>
                  <FieldName>
                     {severity}
                     <Required>*</Required>
                  </FieldName>
                  <InputAndErrorField>
                     <DropDown
                        onSlectOption={onChangeSeverity}
                        value={severityOfObservation}
                        options={['High', 'Low', 'Medium']}
                     />
                     {severityErrorMsg !== '' && (
                        <Required>{severityErrorMsg}</Required>
                     )}
                  </InputAndErrorField>
               </FieldContainer>

               <FieldContainer>
                  <FieldName>
                     {description}
                     <Required>*</Required>
                  </FieldName>
                  <InputAndErrorField>
                     <TextArea
                        testid={'description'}
                        className={'user-observation-description'}
                        value={descriptionOfObservation}
                        onHandleChange={onChangeDescription}
                        placeHolder={'Description'}
                     />
                     {descriptionErrorMsg !== '' && (
                        <Required>{descriptionErrorMsg}</Required>
                     )}
                  </InputAndErrorField>
               </FieldContainer>

               <FieldContainer>
                  <FieldName>{attachments}</FieldName>
                  <DragAndDrop onDrag={() => {}} onDragOver={() => {}}>
                     <InputField value="" type={'file'} />
                  </DragAndDrop>
               </FieldContainer>

               <PrimaryButton
                  apiStatus={apiStatus}
                  value={submit}
                  handleClick={onClickSubmit}
                  className={'submit-btn'}
               />
            </ObservationForm>
         </DesktopLayoutMainPage>
      )
   }
}
export { RpObservationPage }
