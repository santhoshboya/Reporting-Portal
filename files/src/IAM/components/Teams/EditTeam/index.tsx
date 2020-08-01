import React, { Component } from 'react'
import { observable, reaction } from 'mobx'
import { observer } from 'mobx-react'
import { withTranslation, WithTranslation } from 'react-i18next'
import { API_FAILED, API_SUCCESS } from '@ib/api-constants'

import TextInput from '../../../../Common/components/TextInput'
import TextArea from '../../../../Common/components/TextInput/TextArea'
import BackArrowIcon from '../../../../Common/icons/BackArrowIcon'
import CommonButton from '../../../../Common/components/Button'
import DropDownWithMultiSelect from '../../../../Common/components/DropDownWithMultiSelect'
import { getFormattedAPIErrorDescription } from '../../../../Common/utils/APIErrorUtils'
import { showToast } from '../../../../Common/utils/ToastUtils/ToastUtil'
import { toastTypes } from '../../../../Common/constants/ToastTypes'

import { EMPTY_STRING } from '../../../Common/constants/stringConstants'
import { MEMBER_ID, USER_ID } from '../../../constants/teamsConstants'
import TeamModel from '../../../stores/models/TeamModel'
import UserOptionModel from '../../../stores/models/UserOptionModel'
import { MemberObject } from '../../../stores/types'

import {
   EditTeamWrapper,
   GoBack,
   BackCaption,
   EditTeamHeadline,
   TeamDetailsWrapper,
   TeamDetailsContainer,
   TeamDetailsHeadingContainer,
   TeamDetailsHeading,
   TeamNameContainer,
   TeamDescriptionContainer,
   MembersContainer,
   SaveButtonContainer,
   EditTeamMembersContainer,
   SelectedMembers,
   MemberOption
} from './styledComponents'

interface EditTeamProps extends WithTranslation {
   goBack: () => void
   team: TeamModel
   members: Array<UserOptionModel>
}

@observer
class EditTeam extends Component<EditTeamProps> {
   @observable teamName!: string
   @observable teamDescription!: string
   @observable selectedMembers: Array<any> = []
   teamNameRef = React.createRef<TextInput>()
   addMembersRef = React.createRef<DropDownWithMultiSelect>()

   constructor(props: EditTeamProps) {
      super(props)
      const { name, description, membersList } = this.props.team
      this.teamName = name
      this.teamDescription = description
      this.selectedMembers = this.getOptions(membersList)
   }

   componentWillUnmount() {
      this.goBackReaction()
      this.editTeamApiErrorReaction()
   }

   goBackReaction = reaction(
      (): boolean => {
         const { editTeamsAPIStatus } = this.props.team
         return editTeamsAPIStatus === API_SUCCESS
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

   getMemberId = (member: UserOptionModel | MemberObject) =>
      member[USER_ID] ? member[USER_ID] : member[MEMBER_ID]

   getOptions = (data: Array<UserOptionModel | MemberObject>) =>
      data.map(member => ({
         value: this.getMemberId(member),
         label: member.name
      }))

   onChangeMembers = members => {
      if (members) {
         this.selectedMembers = [...members]
         return
      }
      this.selectedMembers = []
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

   editTeamApiErrorReaction = reaction(
      (): boolean => {
         const { editTeamsAPIStatus } = this.props.team
         return editTeamsAPIStatus === API_FAILED
      },
      _ => {
         const { editTeamsAPIError } = this.props.team
         const apiError = getFormattedAPIErrorDescription(editTeamsAPIError)
         if (this.isNameError(apiError)) {
            this.teamNameRef.current?.inputRef.current.setError(apiError)
         }
         showToast({ message: apiError, type: toastTypes.danger })
      }
   )

   getSelectedMembers = () => this.selectedMembers.map(member => member.value)

   onSaveTeamDetails = () => {
      const { onEditTeam } = this.props.team
      if (this.isError()) {
         return
      }
      const updatedTeam = {
         name: this.teamName,
         description: this.teamDescription,
         user_ids: this.getSelectedMembers()
      }
      onEditTeam(updatedTeam)
   }

   renderMembers = () => {
      if (this.selectedMembers) {
         return this.selectedMembers.map(member => (
            <MemberOption key={member.value}>{member.label}</MemberOption>
         ))
      }
      return
   }

   render() {
      const { t, goBack, members } = this.props
      const { membersList, editTeamsAPIStatus } = this.props.team

      return (
         <EditTeamWrapper>
            <GoBack onClick={goBack}>
               <BackArrowIcon />
               <BackCaption>{t('iam:teams.addOrEditTeam.back')}</BackCaption>
            </GoBack>
            <EditTeamHeadline>
               {t('iam:teams.addOrEditTeam.editTeam')}
            </EditTeamHeadline>
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

                  <TeamDescriptionContainer>
                     <TextArea
                        value={this.teamDescription}
                        onChange={this.onChangeTeamDescription}
                        placeholder={t(
                           'iam:teams.addOrEditTeam.descriptionPlaceholder'
                        )}
                        label={t('iam:teams.addOrEditTeam.descriptionLabel')}
                     />
                  </TeamDescriptionContainer>
                  {/* NOTE: Need to do as per the zeplin screen */}
                  <EditTeamMembersContainer>
                     <DropDownWithMultiSelect
                        ref={this.addMembersRef}
                        placeholder={t(
                           'iam:teams.addOrEditTeam.addMembersPlaceholder'
                        )}
                        options={this.getOptions([...membersList, ...members])}
                        isMulti={true}
                        onChange={this.onChangeMembers}
                        labelText={t('iam:teams.addOrEditTeam.addMembersLabel')}
                        defaultValue={this.getOptions(membersList)}
                     />
                     <MembersContainer>
                        <SelectedMembers>
                           {this.renderMembers()}
                        </SelectedMembers>
                     </MembersContainer>
                  </EditTeamMembersContainer>
               </TeamDetailsContainer>
               <SaveButtonContainer>
                  <CommonButton
                     apiStatus={editTeamsAPIStatus}
                     onClick={this.onSaveTeamDetails}
                     text={t('iam:teams.addOrEditTeam.editButton')}
                  />
               </SaveButtonContainer>
            </TeamDetailsWrapper>
         </EditTeamWrapper>
      )
   }
}

export default withTranslation()(EditTeam)
