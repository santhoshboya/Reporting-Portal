import React, { Component } from 'react'
import './index.css'
import { DesktopLayoutMainPage } from '../DesktopLayoutMainPage'
import strings from '../../i18n/strings.json'
import {
    ObservationForm, BackToObservationsLink, FieldContainer, ButtonsDiv,
    FieldName, DragAndDrop, Required, Title, RadioButtonsDiv,
    RadioLable, HeaderDiv, ChatHeading
} from './styledComponent'
import { Image } from '../Image'
import { InputField } from '../InputField'
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
        const { onClickSubmit, title, cateogaryOfObservation,
            subCateogaryOfObservation, severityOfObservation,
            descriptionOfObservation, attachmentsOfObservation,
            onChangeCateogary, onChangeSubCateogary,
            onChangeSeverity, onChangeDescription, goBack,
            severityErrorMsg, onReset, dueDateObsrvation,
            reportedOnObservation } = this.props


        const {
            cateogary, severity, attachments, subCateogary,
            submit, status, reportedOn, assignedTo, dueDate,
            reset, type, publicBtn, privateBtn, observation, chat
        } = strings.usersScreen
        return (
            <DesktopLayoutMainPage>
                <HeaderDiv >
                    <FieldName>
                        {observation}
                    </FieldName>
                    <ChatHeading>
                        {chat}
                    </ChatHeading>
                </HeaderDiv>
                <ObservationForm>
                    <BackToObservationsLink >
                        <Image onClick={goBack} src={'https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/24ef7d49-46b3-47e6-b835-579ee7a857d0.svg'} />
                        <Title>{title}Title</Title>
                    </BackToObservationsLink>

                    <FieldContainer>
                        <TextArea className={'observation-description'} value={descriptionOfObservation} onHandleChange={onChangeDescription} />
                    </FieldContainer>

                    <FieldContainer>
                        <FieldName>
                            {cateogary}
                        </FieldName>
                        <DropDown onSlectOption={onChangeCateogary} value={cateogaryOfObservation} options={['Asset Management', 'Tech', 'Management']} />
                        <FieldName>
                            {subCateogary}
                        </FieldName>
                        <DropDown onSlectOption={onChangeSubCateogary} value={subCateogaryOfObservation} options={['Asset Management', 'Tech', 'Management']} />
                    </FieldContainer>

                    <FieldContainer>
                        <FieldName>
                            {status}
                        </FieldName>
                        <DropDown onSlectOption={onChangeSeverity} value={severityOfObservation} options={['HIGH', 'LOW', 'WARNING']} />
                    </FieldContainer>

                    <FieldContainer>
                        <FieldName>
                            {severity}
                        </FieldName>
                        <DropDown onSlectOption={onChangeSeverity} value={severityOfObservation} options={['HIGH', 'LOW', 'WARNING']} />
                        {severityErrorMsg !== "" && <Required>{severityErrorMsg}</Required>}
                    </FieldContainer>

                    <FieldContainer>
                        <FieldName>
                            {attachments}
                        </FieldName>
                        <DragAndDrop onDrag={() => { }} onDragOver={() => { }} />
                    </FieldContainer>

                    <FieldContainer>
                        <FieldName>
                            {assignedTo}
                        </FieldName>
                        <DropDown onSlectOption={onChangeSeverity} value={severityOfObservation} options={['HIGH', 'LOW', 'WARNING']} />
                    </FieldContainer>

                    <FieldContainer>
                        <FieldName>
                            {reportedOn}
                        </FieldName>
                        <DatePicker value={reportedOnObservation} />
                    </FieldContainer>

                    <FieldContainer>
                        <FieldName>
                            {dueDate}
                        </FieldName>
                        <DatePicker value={dueDateObsrvation} />
                    </FieldContainer>

                    <RadioButtonsDiv>
                        <RadioButton className={'radio-btn'} name={type} />
                        <RadioLable>{publicBtn}</RadioLable>
                        <RadioButton className={'radio-btn'} name={type} />
                        <RadioLable>{privateBtn}</RadioLable>
                    </RadioButtonsDiv>

                    <ButtonsDiv>
                        <SecondaryButton value={reset} handleClick={onReset} className={'reset-btn'} />
                        <PrimaryButton value={submit} handleClick={onClickSubmit} className={'submit-btn'} />

                    </ButtonsDiv>
                </ObservationForm>

            </DesktopLayoutMainPage>
        )
    }
}
export { ObservationScreen }
