import React, { Component } from 'react'
import './index.css'
import { DesktopLayoutMainPage } from '../DesktopLayoutMainPage'
import strings from '../../i18n/strings.json'
import {
    ObservationForm, BackToObservationsLink, FieldContainer, ButtonsDiv,
    FieldName, DragAndDrop, Required, Title, RadioButtonsDiv,
    RadioLable, HeaderDiv, ChatHeading, Buttons, ObsertationDiv
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




@observer
class ObservationScreen extends Component {
    renderSuccessUi = () => {

        const { title, cateogaryOfObservation, subCateogaryOfObservation, severityOfObservation, descriptionOfObservation,
            attachmentsOfObservation, assignedToOfObservation, statusOfObservation, dueDateOfObservation, privacyOfObservation,
            onChangePrivacy, onChangeAssignedTO, onChangeDueDate, onChangeStatus, onUpdate, onChangeDescription,
            reportedOnOfObservation, goBack, onReset, userType, apiStatus, cateogaries, getSubCateogaries, cateogariesList,
            onChangeSubCategory, onChangeCategory } = this.props


        const {
            cateogary, severity, attachments, subCateogary,
            submit, status, reportedOn, assignedTo, dueDate,
            reset, type, publicBtn, privateBtn, observation, chat, update
        } = strings.usersScreen
        console.log(1444444444444444444444444444, cateogaries, getSubCateogaries, cateogariesList);


        return (
            <React.Fragment>
                <HeaderDiv >
                    <ObsertationDiv>
                        {observation}
                    </ObsertationDiv>
                    <ChatHeading>
                        {chat}
                    </ChatHeading>
                </HeaderDiv>
                <ObservationForm>
                    <BackToObservationsLink >
                        <Image className={'goback'} onHandleClick={goBack}
                            src={'https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/24ef7d49-46b3-47e6-b835-579ee7a857d0.svg'} />
                        <Title>{title}</Title>
                    </BackToObservationsLink>

                    <FieldContainer>
                        <TextArea className={'observation-description'} value={descriptionOfObservation}
                            onHandleChange={onChangeDescription} isDisabled={true} />
                    </FieldContainer>

                    <FieldContainer>
                        <FieldName>
                            {cateogary}
                        </FieldName>
                        <DropDown onSlectOption={onChangeCategory} value={cateogaryOfObservation} options={cateogaries.length > 0 ? cateogariesList : []}
                            isDisabled={(userType === USER || userType === RP) ? true : false}
                        />
                        <FieldName>
                            {subCateogary}
                        </FieldName>
                        <DropDown userType={userType} onSlectOption={onChangeSubCategory} value={subCateogaryOfObservation} options={cateogaries.length > 0 ? getSubCateogaries : []}
                            isDisabled={(userType === USER || userType === RP) ? true : false} />
                    </FieldContainer>

                    <FieldContainer>
                        <FieldName>
                            {status}
                        </FieldName>
                        <DropDown userType={userType} onSlectOption={onChangeStatus} value={statusOfObservation}
                            options={["action in progress", 'pending', 'completed']} isDisabled={(userType === USER || userType === ADMIN) ? true : false} />
                    </FieldContainer>

                    <FieldContainer>
                        <FieldName>
                            {severity}
                        </FieldName>
                        <DropDown userType={userType} onSlectOption={() => { }} value={severityOfObservation}
                            options={['HIGH', 'LOW', 'WARNING']} isDisabled={true} />
                    </FieldContainer>

                    <FieldContainer>
                        <FieldName>
                            {attachments}
                        </FieldName>
                        <DragAndDrop onDrag={() => { }} onDragOver={() => { }} isDisabled={true} />
                    </FieldContainer>

                    <FieldContainer>
                        <FieldName>
                            {assignedTo}
                        </FieldName>
                        <DropDown userType={userType} onSlectOption={onChangeAssignedTO} value={assignedToOfObservation}
                            options={['PavanKumar', 'Janardhan', 'Sunny']} isDisabled={(userType === USER) ? true : false} />
                    </FieldContainer>

                    <FieldContainer>
                        <FieldName>
                            {reportedOn}
                        </FieldName>
                        <DatePicker isDisabled={true}
                            className={userType === RP ? "datepicker-field" : ""} value={reportedOnOfObservation} />
                    </FieldContainer>

                    <FieldContainer >
                        <FieldName>
                            {dueDate}
                        </FieldName>
                        <DatePicker isDisabled={(userType === USER) ? true : false} className={userType === USER ? "datepicker-field" : ""}
                            value={dueDateOfObservation} onChangeDate={onChangeDueDate} />
                    </FieldContainer>

                    {userType !== "user" &&
                        <Buttons>
                            <RadioButtonsDiv userType={userType} id={type} onChange={onChangePrivacy} value={privacyOfObservation}>
                                <RadioButton className={'radio-btn'} name={type} value={publicBtn} onHandleCheck={onChangePrivacy} />
                                <RadioLable>{publicBtn}</RadioLable>
                                <RadioButton className={'radio-btn'} name={type} value={privateBtn} onHandleCheck={onChangePrivacy} />
                                <RadioLable>{privateBtn}</RadioLable>
                            </RadioButtonsDiv>


                            <ButtonsDiv>
                                <SecondaryButton value={reset} handleClick={onReset} className={'reset-btn'} />
                                <PrimaryButton apiStatus={apiStatus} value={update} handleClick={onUpdate} className={'submit-btn'} />

                            </ButtonsDiv>
                        </Buttons>}
                </ObservationForm>
            </React.Fragment>
        );

    }


    render() {

        const { apiStatus, apiError, onRetryClick, currentPage, navigateTOPage, userType, getSubCateogaries } = this.props

        return (
            <DesktopLayoutMainPage userName={"Santhu"} currentPage={currentPage} navigateTOPage={navigateTOPage}
                userType={userType}>
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
