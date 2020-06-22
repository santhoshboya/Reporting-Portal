import React, { Component } from 'react'
import './index.css'
import { DesktopLayoutMainPage } from '../DesktopLayoutMainPage'
import strings from '../../i18n/strings.json'
import {
   ObservationForm,
   BackToObservationsLink,
   FieldContainer,
   ButtonsDiv,
   FieldName,
   DragAndDrop,
   Required,
   Title,
   RadioButtonsDiv,
   RadioLable,
   HeaderDiv,
   ChatHeading,
   Buttons,
   ObsertationDiv
} from './styledComponent'
import { USER, RP, ADMIN } from '../../constants/NameConstants'
import { Image } from '../Image'
import { DropDown } from '../DropDown'
import { TextArea } from '../TextArea'
import { PrimaryButton } from '../PrimaryButton'

import { observer } from 'mobx-react'
import { DatePicker } from '../DatePicker/DatePicker'
import { SecondaryButton } from '../SecondaryButton'
import { RadioButton } from '../RadioButton'
import LoadingWrapperWithFailure from '../LoadingWrapperWithFailure'
import { ToastContainer } from 'react-toastify'

type UserDetails={
   first_name:string,
   last_name:string
}


type subCategoriesType={
   "id": number,
   "name": string
}

type categoriesType={
   "category_id": number,
   "category": string,
   "sub_catogiries":Array<subCategoriesType>
}

type ObservationScreenProps={
   title:string,
   cateogaryOfObservation:string,
   subCateogaryOfObservation:string,
   severityOfObservation:string,
   descriptionOfObservation:string,
   attachmentsOfObservation:Array<string>,
   assignedToOfObservation:string,
   statusOfObservation:number,
   dueDateOfObservation:string,
   privacyOfObservation:string,
   onChangePrivacy:(value:string)=>void,
   onChangeAssignedTO:(value:string)=>void,
   onChangeDueDate:(value:string)=>void,
   onChangeStatus:(value:string)=>void,
   onUpdate:()=>void,
   onChangeDescription:(value:string)=>void,
   reportedOnOfObservation:string,
   goBack:()=>void,
   onReset:()=>void,
   userType:string,
   apiStatus:number,
   cateogaries:Array<categoriesType>,
   getSubCateogaries:Array<string>,
   cateogariesList:Array<string>,
   onChangeSubCategory:(value:string)=>void,
   onChangeCategory:(value:string)=>void,
   rpList:Array<string>
   apiError:string,
   onRetryClick:()=>void,
   currentPage:string,
   navigateTOPage:(value:string)=>void
}


@observer
class ObservationScreen extends Component<ObservationScreenProps>{
   renderSuccessUi = observer(() => {
      const {
         title,
         cateogaryOfObservation,
         subCateogaryOfObservation,
         severityOfObservation,
         descriptionOfObservation,
         attachmentsOfObservation,
         assignedToOfObservation,
         statusOfObservation,
         dueDateOfObservation,
         privacyOfObservation,
         onChangePrivacy,
         onChangeAssignedTO,
         onChangeDueDate,
         onChangeStatus,
         onUpdate,
         onChangeDescription,
         reportedOnOfObservation,
         goBack,
         onReset,
         userType,
         apiStatus,
         cateogaries,
         getSubCateogaries,
         cateogariesList,
         onChangeSubCategory,
         onChangeCategory,
         rpList
      } = this.props

      const {
         cateogary,
         severity,
         attachments,
         subCateogary,
         submit,
         status,
         reportedOn,
         assignedTo,
         dueDate,
         reset,
         type,
         publicBtn,
         privateBtn,
         observation,
         chat,
         update
      } = strings.usersScreen
      let reportedDate = reportedOnOfObservation
         ? `${reportedOnOfObservation.slice(
              0,
              10
           )}T${reportedOnOfObservation.slice(11)}`
         : ''
      let dueDateNewFormat = dueDateOfObservation
         ? `${dueDateOfObservation.slice(0, 10)}T${dueDateOfObservation.slice(
              11
           )}`
         : ''
      return (
         <React.Fragment>
            <HeaderDiv>
               <ObsertationDiv>{observation}</ObsertationDiv>
               <ChatHeading>{chat}</ChatHeading>
            </HeaderDiv>
            <ObservationForm>
               <BackToObservationsLink>
                  <Image
                     className={'goback'}
                     onHandleClick={goBack}
                     src={
                        'https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/24ef7d49-46b3-47e6-b835-579ee7a857d0.svg'
                     }
                  />
                  <Title>{title}</Title>
               </BackToObservationsLink>

               <FieldContainer>
                  <TextArea
                     className={'observation-description'}
                     value={descriptionOfObservation}
                     onHandleChange={onChangeDescription}
                     isDisabled={true}
                  />
               </FieldContainer>

               <FieldContainer>
                  <FieldName>{cateogary}</FieldName>
                  <DropDown
                     onSlectOption={onChangeCategory}
                     value={
                        cateogaryOfObservation
                           ? cateogaryOfObservation
                           : ''
                     }
                     options={cateogaries.length > 0 ? cateogariesList : []}
                     isDisabled={
                        userType === USER || userType === RP ? true : false
                     }
                  />
                  <FieldName>{subCateogary}</FieldName>
                  {/* cateogaryOfObservation.name */}
                  <DropDown
                     userType={userType}
                     onSlectOption={onChangeSubCategory}
                     key={
                        cateogaryOfObservation
                           ? cateogaryOfObservation
                           : ''
                     }
                     value={
                        subCateogaryOfObservation
                           ? subCateogaryOfObservation
                           : ''
                     }
                     options={cateogaries.length > 0 ? getSubCateogaries : []}
                     isDisabled={
                        userType === USER || userType === RP ? true : false
                     }
                  />
               </FieldContainer>

               <FieldContainer>
                  <FieldName>{status}</FieldName>
                  <DropDown
                     userType={userType}
                     onSlectOption={onChangeStatus}
                     value={statusOfObservation}
                     options={[
                        'Reported',
                        'Action in progress',
                        'Resolved',
                        'Closed',
                        'Acknowledged by Rp'
                     ]}
                     isDisabled={
                        userType === USER || userType === ADMIN ? true : false
                     }
                  />
               </FieldContainer>

               <FieldContainer>
                  <FieldName>{severity}</FieldName>
                  <DropDown
                     userType={userType}
                     onSlectOption={() => {}}
                     value={severityOfObservation}
                     options={['High', 'Low', 'Medium']}
                     isDisabled={true}
                  />
               </FieldContainer>

               <FieldContainer>
                  <FieldName>{attachments}</FieldName>
                  <DragAndDrop
                     onDrag={() => {}}
                     onDragOver={() => {}}
                  />
               </FieldContainer>
               <FieldContainer>
                  <FieldName>{assignedTo}</FieldName>
                  {/* assignedToOfObservation.first_name */}
                  <DropDown
                     userType={userType}
                     onSlectOption={onChangeAssignedTO}
                     value={
                        assignedToOfObservation
                           ? assignedToOfObservation
                           : ''
                     }
                     options={rpList}
                     isDisabled={
                        userType === USER || userType === ADMIN ? true : false
                     }
                  />
               </FieldContainer>

               <FieldContainer>
                  <FieldName>{reportedOn}</FieldName>
                  <DatePicker
                     isDisabled={true}
                     className={'datepicker-field'}
                     value={reportedDate}
                  />
               </FieldContainer>

               <FieldContainer>
                  <FieldName>{dueDate}</FieldName>
                  {dueDateNewFormat || userType == RP ? (
                     <DatePicker
                        isDisabled={
                           userType === USER || userType === ADMIN
                              ? true
                              : false
                        }
                        className={
                           userType === USER || userType === ADMIN
                              ? 'datepicker-field'
                              : ''
                        }
                        value={dueDateNewFormat}
                        onChangeDate={onChangeDueDate}
                     />
                  ) : (
                     <p>Due Date Not set</p>
                  )}
               </FieldContainer>
               {userType !== 'user' && (
                  <Buttons>
                     {userType === RP && (
                        <RadioButtonsDiv>
                           <RadioButton
                              data-testid='public'
                              className={'radio-btn'}
                              privacy={privacyOfObservation}
                              name={type}
                              value={'Public'}
                              onHandleCheck={onChangePrivacy}
                           />
                           <RadioLable>{publicBtn}</RadioLable>
                           <RadioButton
                              data-testid='private'
                              className={'radio-btn'}
                              privacy={privacyOfObservation}
                              name={type}
                              value={'Private'}
                              onHandleCheck={onChangePrivacy}
                           />
                           <RadioLable>{privateBtn}</RadioLable>
                        </RadioButtonsDiv>
                     )}

                     <ButtonsDiv>
                        <SecondaryButton
                           data-testid='reset'
                           value={reset}
                           handleClick={onReset}
                           className={'reset-btn'}
                        />
                        <PrimaryButton
                           data-testid='submit'
                           apiStatus={apiStatus}
                           value={update}
                           handleClick={onUpdate}
                           className={'submit-btn'}
                        />
                     </ButtonsDiv>
                  </Buttons>
               )}
            </ObservationForm>
         </React.Fragment>
      )
   })

   render() {
      const {
         apiStatus,
         apiError,
         onRetryClick,
         currentPage,
         navigateTOPage,
         userType,
      } = this.props

      return (
         <DesktopLayoutMainPage
            userName={'Santhu'}
            currentPage={currentPage}
            navigateTOPage={navigateTOPage}
            userType={userType}
            profilePic={
               'https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/5a060d96-2b5d-4c5d-8c81-cb89b5b8328a@3x.png'
            }
         >
            <LoadingWrapperWithFailure
               apiStatus={apiStatus}
               apiError={apiError}
               renderSuccessUI={this.renderSuccessUi}
               onRetryClick={onRetryClick}
            />
         </DesktopLayoutMainPage>
      )
   }
}
export { ObservationScreen }
