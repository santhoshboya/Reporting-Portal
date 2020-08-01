import React, { Component } from 'react'
import { observable, reaction, action } from 'mobx'
import { observer } from 'mobx-react'
import { withTranslation, WithTranslation } from 'react-i18next'
import { APIStatus, API_SUCCESS, API_FAILED } from '@ib/api-constants'

import BackArrowIcon from '../../../../Common/icons/BackArrowIcon'
import TextInput from '../../../../Common/components/TextInput'
import TextArea from '../../../../Common/components/TextInput/TextArea'
import CommonButton from '../../../../Common/components/Button'
import DropDownWithMultiSelect from '../../../../Common/components/DropDownWithMultiSelect'
import { getFormattedAPIErrorDescription } from '../../../../Common/utils/APIErrorUtils'
import { showToast } from '../../../../Common/utils/ToastUtils/ToastUtil'
import { toastTypes } from '../../../../Common/constants/ToastTypes'

import { EMPTY_STRING } from '../../../Common/constants/stringConstants'
import UserOptionModel from '../../../stores/models/UserOptionModel'
import { NewTeamObject, AddTeamApiResponse } from '../../../stores/types'

import {
   AddTeamWrapper,
   GoBack,
   BackCaption,
   AddTeamHeadline,
   TeamDetailsWrapper,
   TeamDetailsContainer,
   TeamDetailsHeadingContainer,
   TeamDetailsHeading,
   SaveButtonContainer,
   TeamNameContainer,
   TeamDescritpionContainer,
   AddTeamMembersContainer,
   MembersContainer,
   SelectedMembers,
   MemberOption
} from './styledComponents'

interface SelectedMemberType {
   value: string
   label: string
}

interface AddTeamProps extends WithTranslation {
   goBack: () => void
   onAddTeam: (team: NewTeamObject) => Promise<void | AddTeamApiResponse>
   addTeamApiStatus: APIStatus
   addTeamApiError: Error | null
   members: Array<UserOptionModel>
}

@observer
class AddTeam extends Component<AddTeamProps> {
   @observable teamName: string = EMPTY_STRING
   @observable teamDescription: string = EMPTY_STRING
   @observable selectedMembers: Array<SelectedMemberType> = []
   teamNameRef = React.createRef<TextInput>()
   addMembersRef = React.createRef<DropDownWithMultiSelect>()

   componentWillUnmount() {
      this.goBackReaction()
      this.addTeamApiErrorReaction()
   }

   goBackReaction = reaction(
      (): boolean => {
         const { addTeamApiStatus } = this.props
         return addTeamApiStatus === API_SUCCESS
      },
      (_: boolean): void => {
         const { goBack } = this.props
         goBack()
      }
   )

   onChangeTeamName = (event: any) => {
      this.teamName = event.target.value
   }
   onChangeTeamDescription = (event: any) => {
      this.teamDescription = event.target.value
   }

   isEmptyString = (value: string) => value === EMPTY_STRING

   isError = () => {
      this.teamNameRef.current?.validateInput()
      return this.teamNameRef.current?.isError
   }

   validateTeamName = () => {
      const { t } = this.props
      if (this.isEmptyString(this.teamName)) {
         return {
            shouldShowError: true,
            errorMessage: t('iam:teams.addOrEditTeam.emptyNameError')
         }
      }
      return {
         shouldShowError: false,
         errorMessage: EMPTY_STRING
      }
   }

   isNameError = (errorMessage: string) => {
      const { t } = this.props
      return errorMessage.includes(t('iam:teams.addOrEditTeam.nameExistError'))
   }

   addTeamApiErrorReaction = reaction(
      (): boolean => {
         const { addTeamApiStatus } = this.props
         return addTeamApiStatus === API_FAILED
      },
      _ => {
         const { addTeamApiError } = this.props
         const apiError = getFormattedAPIErrorDescription(addTeamApiError)
         if (this.isNameError(apiError)) {
            this.teamNameRef.current?.inputRef.current.setError(apiError)
         }
         showToast({ message: apiError, type: toastTypes.danger })
      }
   )

   getOptions = () => {
      const { members } = this.props
      return members.map(member => ({
         value: member.id,
         label: member.name
      }))
   }

   @action
   onChangeMembers = selectedMembers => {
      if (selectedMembers) {
         this.selectedMembers = [...selectedMembers]
         return
      }
      this.selectedMembers = []
   }
   renderMembers = () => {
      if (this.selectedMembers) {
         return this.selectedMembers.map(member => (
            <MemberOption key={member.label}>{member.label}</MemberOption>
         ))
      }
      return
   }

   getSelectedMembers = () => this.selectedMembers.map(member => member.value)

   onSaveTeamDetails = () => {
      const { onAddTeam } = this.props
      if (this.isError()) {
         return
      }
      const newTeam = {
         name: this.teamName,
         description: this.teamDescription,
         user_ids: this.getSelectedMembers()
      }

      onAddTeam(newTeam)
   }

   render() {
      const { t, goBack, addTeamApiStatus } = this.props
      return (
         <AddTeamWrapper>
            <GoBack onClick={goBack}>
               <BackArrowIcon />
               <BackCaption>{t('iam:teams.addOrEditTeam.back')}</BackCaption>
            </GoBack>
            <AddTeamHeadline>
               {t('iam:teams.addOrEditTeam.addTeam')}
            </AddTeamHeadline>
            <TeamDetailsWrapper>
               <TeamDetailsContainer>
                  <TeamDetailsHeadingContainer>
                     <TeamDetailsHeading>
                        {t('iam:teams.addOrEditTeam.details')}
                     </TeamDetailsHeading>
                  </TeamDetailsHeadingContainer>
                  <TeamNameContainer>
                     <TextInput
                        ref={this.teamNameRef}
                        value={this.teamName}
                        onChange={this.onChangeTeamName}
                        validate={this.validateTeamName}
                        placeholder={t(
                           'iam:teams.addOrEditTeam.namePlaceholder'
                        )}
                        label={t('iam:teams.addOrEditTeam.nameLabel')}
                     />
                  </TeamNameContainer>

                  <TeamDescritpionContainer>
                     <TextArea
                        value={this.teamDescription}
                        onChange={this.onChangeTeamDescription}
                        placeholder={t(
                           'iam:teams.addOrEditTeam.descriptionPlaceholder'
                        )}
                        label={t('iam:teams.addOrEditTeam.descriptionLabel')}
                     />
                  </TeamDescritpionContainer>
                  <AddTeamMembersContainer>
                     <DropDownWithMultiSelect
                        ref={this.addMembersRef}
                        placeholder={t(
                           'iam:teams.addOrEditTeam.addMembersPlaceholder'
                        )}
                        options={this.getOptions()}
                        isMulti={true}
                        onChange={this.onChangeMembers}
                        labelText={t('iam:teams.addOrEditTeam.addMembersLabel')}
                     />
                     <MembersContainer>
                        <SelectedMembers>
                           {this.renderMembers()}
                        </SelectedMembers>
                     </MembersContainer>
                  </AddTeamMembersContainer>
               </TeamDetailsContainer>
               <SaveButtonContainer>
                  <CommonButton
                     apiStatus={addTeamApiStatus}
                     onClick={this.onSaveTeamDetails}
                     text={t('iam:teams.addOrEditTeam.addButton')}
                  />
               </SaveButtonContainer>
            </TeamDetailsWrapper>
         </AddTeamWrapper>
      )
   }
}

export default withTranslation()(AddTeam)
