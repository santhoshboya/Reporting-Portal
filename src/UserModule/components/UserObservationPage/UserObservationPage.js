import React, { Component } from 'react'
import './index.css'
import { DesktopLayoutMainPage } from '../../../common/components/DesktopLayoutMainPage'
import { PageHeader } from '../../../common/components/PageHeader'
import strings from '../../../common/i18n/strings.json'
import { ObservationForm,BackToObservationsLink,FieldContainer,FieldName,DragAndDrop} from './styledComponent'
import { Image } from '../../../common/components/Image'
import { InputField } from '../../../common/components/InputField'
import { DropDown } from '../../../common/components/DropDown'
import { TextArea } from '../../../common/components/TextArea'
import { PrimaryButton } from '../../../common/components/PrimaryButton'



class UserObservationPage extends Component {
    render() {
        const {profilePic,username,handleClick}=this.props
        const {titleOfTheObservation,culturalDeviations,
            backToObservations,cateogary,severity,description,
            attachments,subCateogary,submit}=strings.usersScreen
        return (
            <DesktopLayoutMainPage>
                <PageHeader 
                    src={profilePic} 
                    username={username}
                /> 

                <ObservationForm>

                    <BackToObservationsLink>
                        <Image src={'https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/24ef7d49-46b3-47e6-b835-579ee7a857d0.svg'}/>
                        {backToObservations}
                    </BackToObservationsLink>

                    <FieldContainer>
                        <FieldName>
                            {titleOfTheObservation}
                        </FieldName>
                        <InputField type={'text'} value={""} onHandleChange={()=>{}} placeHolder={culturalDeviations}/>
                    </FieldContainer>

                    <FieldContainer>
                        <FieldName>
                            {cateogary}
                        </FieldName>
                        <DropDown onSlectOption={()=>{}} options={['Asset Management','Tech','Management']}/>
                        <FieldName>
                            {subCateogary}
                        </FieldName>
                        <DropDown onSlectOption={()=>{}} options={['Asset Management','Tech','Management']}/>
                    </FieldContainer>

                    <FieldContainer>
                        <FieldName>
                            {severity}
                        </FieldName>
                        <DropDown onSlectOption={()=>{}} options={['HIGH','LOW','WARNING']}/>
                    </FieldContainer>

                    <FieldContainer>
                        <FieldName>
                            {description}
                        </FieldName>
                        <TextArea className={'user-observation-description'} value={""} onHandleChange={()=>{}} placeHolder={"Description"}/>
                    </FieldContainer>

                    <FieldContainer>
                        <FieldName>
                            {attachments}
                        </FieldName>
                       <DragAndDrop onDrag={()=>{}} onDragOver={()=>{}}/>
                    </FieldContainer>
                    <PrimaryButton value={submit} handleClick={()=>{}} className={'submit-btn'}/>
                </ObservationForm>

            </DesktopLayoutMainPage>
        )
    }
}
export {UserObservationPage}
