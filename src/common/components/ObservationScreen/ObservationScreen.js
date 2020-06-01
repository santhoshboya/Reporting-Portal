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




@observer
class ObservationScreen extends Component {
    render() {
        const { title, cateogaryOfObservation, subCateogaryOfObservation, severityOfObservation, descriptionOfObservation,
            attachmentsOfObservation, assignedToOfObservation, statusOfObservation, dueDateOfObservation, privacyOfObservation,
            onChangePrivacy, onChangeAssignedTO, onChangeDueDate, onChangeStatus, onUpdate, onChangeDescription,
            reportedOnOfObservation, goBack, onReset, userType, apiStatus } = this.props


        const {
            cateogary, severity, attachments, subCateogary,
            submit, status, reportedOn, assignedTo, dueDate,
            reset, type, publicBtn, privateBtn, observation, chat, update
        } = strings.usersScreen
        console.log("screen");

        return (
            <DesktopLayoutMainPage>
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
                            onHandleChange={onChangeDescription} isDisabled={(userType === USER) ? true : false} />
                    </FieldContainer>

                    <FieldContainer>
                        <FieldName>
                            {cateogary}
                        </FieldName>
                        <DropDown onSlectOption={() => { }} value={cateogaryOfObservation}
                            options={['Asset Management', 'Tech', 'Management']} isDisabled={(userType === USER || userType === RP) ? true : false}
                        />
                        <FieldName>
                            {subCateogary}
                        </FieldName>
                        <DropDown userType={userType} onSlectOption={() => { }} value={subCateogaryOfObservation}
                            options={['Asset Management', 'Tech', 'Management']} isDisabled={(userType === USER || userType === RP) ? true : false} />
                    </FieldContainer>

                    <FieldContainer>
                        <FieldName>
                            {status}
                        </FieldName>
                        <DropDown userType={userType} onSlectOption={onChangeStatus} value={statusOfObservation}
                            options={["action in progress", 'pending', 'completed']} isDisabled={(userType === USER) ? true : false} />
                    </FieldContainer>

                    <FieldContainer>
                        <FieldName>
                            {severity}
                        </FieldName>
                        <DropDown userType={userType} onSlectOption={() => { }} value={severityOfObservation}
                            options={['HIGH', 'LOW', 'WARNING']} isDisabled={(userType === USER || userType === RP) ? true : false} />
                    </FieldContainer>

                    <FieldContainer>
                        <FieldName>
                            {attachments}
                        </FieldName>
                        <DragAndDrop onDrag={() => { }} onDragOver={() => { }} isDisabled={(userType === USER) ? true : false} />
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
                        <DatePicker isDisabled={(userType === USER || userType === RP) ? true : false}
                            className={userType === RP ? "datepicker-field" : ""} value={reportedOnOfObservation} />
                    </FieldContainer>

                    <FieldContainer>
                        <FieldName>
                            {dueDate}
                        </FieldName>
                        <DatePicker isDisabled={(userType === USER) ? true : false} className={userType === USER ? "datepicker-field" : ""}
                            value={dueDateOfObservation} onChangeDate={onChangeDueDate} />
                    </FieldContainer>

                    {userType !== "user" &&
                        <Buttons>
                            <RadioButtonsDiv userType={userType} id={type} onChange={onChangePrivacy} value={privacyOfObservation}>
                                <RadioButton className={'radio-btn'} name={type} value={publicBtn} />
                                <RadioLable>{publicBtn}</RadioLable>
                                <RadioButton className={'radio-btn'} name={type} value={privateBtn} />
                                <RadioLable>{privateBtn}</RadioLable>
                            </RadioButtonsDiv>


                            <ButtonsDiv>
                                <SecondaryButton value={reset} handleClick={onReset} className={'reset-btn'} />
                                <PrimaryButton apiStatus={apiStatus} value={update} handleClick={onUpdate} className={'submit-btn'} />

                            </ButtonsDiv>
                        </Buttons>}
                </ObservationForm>

            </DesktopLayoutMainPage>
        )
    }
}
export { ObservationScreen }
