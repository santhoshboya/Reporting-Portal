import React, { Component } from 'react'
import './index.css'
import { DesktopLayoutMainPage } from '../../../common/components/DesktopLayoutMainPage'
import { PageHeader } from '../../../common/components/PageHeader'
import strings from '../../../common/i18n/strings.json'
import { ObservationForm, BackToObservationsLink, FieldContainer, FieldName, DragAndDrop, Required } from './styledComponent'
import { Image } from '../../../common/components/Image'
import { InputField } from '../../../common/components/InputField'
import { DropDown } from '../../../common/components/DropDown'
import { TextArea } from '../../../common/components/TextArea'
import { PrimaryButton } from '../../../common/components/PrimaryButton'
import { observer } from 'mobx-react'


@observer
class UserObservationPage extends Component {
    render() {
        const { profilePic, username, onClickSubmit, title, cateogaryOfObservation, subCateogaryOfObservation, severityOfObservation,
            descriptionOfObservation, attachmentsOfObservation,
            onChangeTitleOfTheObservation, onChangeCateogary, onChangeSubCateogary,
            onChangeSeverity, onChangeDescription, goBack,
            titleErrorMsg, severityErrorMsg, descriptionErrorMsg } = this.props


        const { titleOfTheObservation, culturalDeviations,
            backToObservations, cateogary, severity, description,
            attachments, subCateogary, submit } = strings.usersScreen
        return (
            <DesktopLayoutMainPage>
                <ObservationForm>

                    <BackToObservationsLink onClick={goBack}>
                        <Image src={'https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/24ef7d49-46b3-47e6-b835-579ee7a857d0.svg'} />
                        {backToObservations}
                    </BackToObservationsLink>

                    <FieldContainer>
                        <FieldName>
                            {titleOfTheObservation}
                            <Required>*</Required>
                        </FieldName>
                        <InputField type={'text'} value={title} onHandleChange={onChangeTitleOfTheObservation} placeHolder={culturalDeviations} />
                        {titleErrorMsg !== "" && <Required>{titleErrorMsg}</Required>}
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
                            {severity}
                            <Required>*</Required>
                        </FieldName>
                        <DropDown onSlectOption={onChangeSeverity} value={severityOfObservation} options={['HIGH', 'LOW', 'WARNING']} />
                        {severityErrorMsg !== "" && <Required>{severityErrorMsg}</Required>}

                    </FieldContainer>

                    <FieldContainer>
                        <FieldName>
                            {description}
                            <Required>*</Required>
                        </FieldName>
                        <TextArea className={'user-observation-description'} value={descriptionOfObservation} onHandleChange={onChangeDescription} placeHolder={"Description"} />
                        {descriptionErrorMsg !== "" && <Required>{descriptionErrorMsg}</Required>}
                    </FieldContainer>

                    <FieldContainer>
                        <FieldName>
                            {attachments}
                        </FieldName>
                        <DragAndDrop onDrag={() => { }} onDragOver={() => { }} >
                            <InputField type={"file"} />
                        </DragAndDrop>
                    </FieldContainer>
                    <PrimaryButton value={submit} handleClick={onClickSubmit} className={'submit-btn'} />
                </ObservationForm>

            </DesktopLayoutMainPage>
        )
    }
}
export { UserObservationPage }
