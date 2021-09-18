import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { observable, toJS } from 'mobx'
import { withTranslation } from 'react-i18next'

import { observer } from 'mobx-react'
import DropDown from '../../../../Common/components/DropDown'
import Button from '../../../../Common/components/Button'
import DropDowWithMultiSelect from '../../../../Common/components/DropDownWithMultiSelect'

import { EditUserRequestObject, FormattedOptions } from '../../../stores/types'
import {
   validateCompany,
   validateUserName,
   validateEmailId,
   validateSelectedRoles,
   validateSelectedTeams
} from '../../../utils/ValidationUtils/ValidationUtils'
import { isFetching } from '../../../utils/HelperUtils/HelperUtils'

import { CompanyOptionsModel } from '../../../stores/models/CompanyOptionsModel'

import {
   Body,
   FormWrapper,
   FiledsWrapper,
   CardContainer,
   InputContainer,
   InputBox,
   Footer,
   CancelButton,
   Wrapper
} from '../AddUser/styledComponents'

import { AddButton } from '../UsersListHeader/styledComponents'

import { Title } from '../styledComponents'
import { GoBack } from './styledComponents'

interface WithTranslationProps {
   t: any
   i18n: any
   tReady: boolean
}

interface EditUserDetailsProps extends WithTranslationProps {
   onClickEditUserData: (requestObject: EditUserRequestObject) => void
   userObject: any
   roles: FormattedOptions //mention role type as value and lable
   formattedCompanies: FormattedOptions
   teams: FormattedOptions
   companies: Array<CompanyOptionsModel>
   editUserApiStatus: number
   onCancelEditUser: () => void
   goBack: () => void
}

interface InjectedProps
   extends EditUserDetailsProps,
      RouteComponentProps,
      WithTranslationProps {}
@observer
class EditUserDetails extends Component<EditUserDetailsProps> {
   @observable userName!: string
   @observable email!: string
   @observable selectedCompany!: string
   @observable error!: boolean
   @observable selectedTeams!: any
   @observable selectedRoles!: any

   userNameRef
   passwordRef
   companySelectorRef
   teamSelectorRef
   roleSelectorRef

   constructor(props) {
      super(props)
      const { userObject } = this.props

      this.userName = userObject.name
      this.email = userObject.email
      this.selectedCompany = userObject.companyName
      this.selectedTeams = this.getFormattedTeamOptions(userObject.teams)
      this.selectedRoles = this.getFormattedRoleOptions(userObject.roles)
      this.userNameRef = React.createRef()
      this.passwordRef = React.createRef()
      this.companySelectorRef = React.createRef()
      this.teamSelectorRef = React.createRef()
      this.roleSelectorRef = React.createRef()
   }

   getFormattedRoleOptions(roles) {
      return roles.map(eachRole => {
         const object = {
            value: eachRole.roleId,
            label: eachRole.roleName
         }
         return object
      })
   }
   getFormattedCompanyOptions(companies) {
      return companies.map(eachRole => {
         const object = {
            value: eachRole.companyName,
            label: eachRole.companyName
         }
         return object
      })
   }
   getFormattedTeamOptions(teams) {
      return teams.map(eachTeam => {
         const object = {
            value: eachTeam.teamId,
            label: eachTeam.teamName
         }
         return object
      })
   }

   onChangeEmailId = (event: React.ChangeEvent<HTMLInputElement>) => {
      this.email = event.target.value
   }
   onChangeUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
      this.userName = event.target.value
   }

   onChangeCompanySelection = value => {
      this.selectedCompany = value
   }
   onSelectTeams = selectedValues => {
      if (selectedValues) {
         this.selectedTeams = [...selectedValues]

         return
      }
      this.selectedTeams = []
   }
   onSelectRoles = selectedValues => {
      if (selectedValues) {
         this.selectedRoles = [...selectedValues]
         return
      }
      this.selectedRoles = []
   }

   notAnError = () =>
      this.userNameRef.current.isError !== true &&
      this.passwordRef.current.isError !== true &&
      this.selectedCompany !== '' &&
      this.selectedTeams.length !== 0 &&
      this.selectedRoles.length !== 0

   validateUserDetails = event => {
      const { companies, onClickEditUserData } = this.props
      this.companySelectorRef.current.onBlur()
      this.teamSelectorRef.current.onBlur()
      this.roleSelectorRef.current.onBlur()

      if (this.notAnError()) {
         const selectedTeamIds = this.selectedTeams.map(team => team.value)
         const selectedRoleIds = this.selectedRoles.map(role => role.value)

         const companyId = companies.find(
            company => company.companyName === this.selectedCompany
         )?.companyId

         const userDetails = {
            name: this.userName,
            email: this.email,
            company_id: companyId,
            team_ids: selectedTeamIds,
            role_ids: selectedRoleIds
         }

         onClickEditUserData(userDetails)
      }
   }
   renderRoles = () => {
      const { t, roles, userObject } = this.props

      return (
         <InputContainer>
            <DropDowWithMultiSelect
               ref={this.roleSelectorRef}
               validate={() => validateSelectedRoles(this.selectedRoles)}
               placeholder={t('iam:users.rolePlaceholder')}
               options={roles}
               labelText={t('iam:users.addUser.roles')}
               isMulti={true}
               onChange={this.onSelectRoles}
               defaultValue={this.getFormattedRoleOptions(userObject.roles)}
            />
         </InputContainer>
      )
   }
   renderCompanyAndTeamFields = () => {
      const { t, teams, userObject, formattedCompanies } = this.props

      return (
         <FiledsWrapper>
            <InputContainer>
               <DropDown
                  ref={this.companySelectorRef}
                  validate={() => validateCompany(this.selectedCompany)}
                  placeholder={t('iam:users.companyPlaceholder')}
                  options={formattedCompanies}
                  labelText={t('iam:users.addUser.company')}
                  onChange={this.onChangeCompanySelection}
                  value={{
                     value: this.selectedCompany,
                     label: this.selectedCompany
                  }}
               />
            </InputContainer>
            <InputContainer>
               <DropDowWithMultiSelect
                  ref={this.teamSelectorRef}
                  validate={() => validateSelectedTeams(this.selectedTeams)}
                  placeholder={t('iam:users.teamPlaceholder')}
                  options={teams}
                  labelText={t('iam:users.addUser.teamsLable')}
                  isMulti={true}
                  onChange={this.onSelectTeams}
                  defaultValue={this.getFormattedTeamOptions(userObject.teams)}
               />
            </InputContainer>
         </FiledsWrapper>
      )
   }

   renderNameAndEmail = () => {
      const { t } = this.props

      return (
         <FiledsWrapper>
            <InputContainer>
               <InputBox
                  ref={this.userNameRef}
                  data-testid={'username-testId'}
                  value={this.userName}
                  onChange={this.onChangeUserName}
                  validate={() => validateUserName(this.userName)}
                  placeholder={t('iam:users.addUser.usernamePlaceHolder')}
                  label={t('iam:users.addUser.usernameLable')}
               />
            </InputContainer>
            <InputContainer>
               <InputBox
                  ref={this.passwordRef}
                  data-testid={'email-testId'}
                  value={this.email}
                  onChange={this.onChangeEmailId}
                  validate={() => validateEmailId(this.email)}
                  placeholder={t('iam:users.addUser.emailPlaceHolder')}
                  label={t('iam:users.addUser.emailLable')}
               />
            </InputContainer>
         </FiledsWrapper>
      )
   }
   renderFormFields = (): React.ReactNode => {
      const { t } = this.props
      return (
         <CardContainer>
            {this.renderNameAndEmail()}
            {this.renderCompanyAndTeamFields()}
            {this.renderRoles()}
         </CardContainer>
      )
   }

   renderFooter = () => {
      const { t, editUserApiStatus, onCancelEditUser } = this.props
      return (
         <Footer>
            <CancelButton
               type={Button.types.filled}
               variant={Button.variants.control}
               text={t('iam:users.cancelButtonText')}
               disabled={isFetching(editUserApiStatus)}
               onClick={onCancelEditUser}
            />
            <AddButton
               apiStatus={editUserApiStatus}
               disabled={isFetching(editUserApiStatus)}
               onClick={this.validateUserDetails}
            >
               {t('iam:users.edituser.save')}
            </AddButton>
         </Footer>
      )
   }
   render() {
      const { t, goBack } = this.props

      return (
         <Wrapper>
            <GoBack onClick={goBack}>{t('iam:users.back')}</GoBack>

            <Title>{t('iam:users.edituser.title')}</Title>
            <Body>
               <FormWrapper>
                  {this.renderFormFields()}
                  {this.renderFooter()}
               </FormWrapper>
            </Body>
         </Wrapper>
      )
   }
}

export default withTranslation()(EditUserDetails)
