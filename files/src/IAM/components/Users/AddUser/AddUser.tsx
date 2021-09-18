import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import { observable } from 'mobx'
import { observer } from 'mobx-react'

import DropDowWithMultiSelect from '../../../../Common/components/DropDownWithMultiSelect'
import DropDown from '../../../../Common/components/DropDown'
import Button from '../../../../Common/components/Button'
import TextInput from '../../../../Common/components/TextInput'

import {
   validateUserName,
   validateEmailId,
   validateCompany,
   validateSelectedRoles,
   validateSelectedTeams
} from '../../../utils/ValidationUtils/ValidationUtils'
import { AddUserRequestObject, FormattedOptions } from '../../../stores/types'
import { CompanyOptionsModel } from '../../../stores/models/CompanyOptionsModel'
import { isFetching } from '../../../utils/HelperUtils/HelperUtils'

import { AddButton } from '../UsersListHeader/styledComponents'
import { Title } from '../styledComponents'

import { UsersWrapper } from '../../../routes/UsersRoute/styledComponents'
import {
   Body,
   FormWrapper,
   FiledsWrapper,
   CardContainer,
   InputContainer,
   InputBox,
   Footer,
   CancelButton,
   Wrapper,
   ErrorWapper
} from './styledComponents'

//FIXME:Resolve withTranslation import issue
interface WithTranslationProps {
   t: any
   i18n: any
   tReady: boolean
}
interface AddUserProps extends WithTranslationProps {
   onClickAddUserData: (requestObject: AddUserRequestObject) => void
   addUserApiStatus: number
   companies: Array<CompanyOptionsModel>
   onCancelAddUserData: () => void
   formattedRoles: FormattedOptions
   formattedCompanies: FormattedOptions
   formattedTeams: FormattedOptions
   addUserResponse
}

@observer
class AddUser extends Component<AddUserProps> {
   @observable userName!: string
   @observable email!: string
   @observable selectedCompany!: string
   @observable error!: boolean
   @observable selectedTeams!: Array<{ value: string; label: string }>
   @observable selectedRoles!: Array<{ value: string; label: string }>

   userNameRef: React.RefObject<TextInput>
   passwordRef: React.RefObject<TextInput>
   companySelectorRef
   teamSelectorRef
   roleSelectorRef

   constructor(props) {
      super(props)
      this.userName = ''
      this.email = ''
      this.selectedCompany = ''
      this.selectedTeams = []
      this.selectedRoles = []
      this.userNameRef = React.createRef()
      this.passwordRef = React.createRef()
      this.companySelectorRef = React.createRef()
      this.teamSelectorRef = React.createRef()
      this.roleSelectorRef = React.createRef()
   }
   componentDidMount() {
      this.userNameRef.current?.focus()
   }

   onChangeEmailId = (event: React.ChangeEvent<HTMLInputElement>) => {
      this.email = event.target.value
   }
   onChangeUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
      this.userName = event.target.value
   }

   onChangeCompanySelection = (value: string) => {
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
      this.userNameRef.current?.isError !== true &&
      this.passwordRef.current?.isError !== true &&
      this.selectedCompany !== '' &&
      this.selectedTeams.length !== 0 &&
      this.selectedRoles.length !== 0

   validateUserDetails = event => {
      event.preventDefault()
      const { onClickAddUserData, companies } = this.props

      this.companySelectorRef.current.onBlur()
      this.teamSelectorRef.current.onBlur()
      this.roleSelectorRef.current.onBlur()

      if (this.notAnError()) {
         const selectedTeamIds = this.selectedTeams.map(team => team.value)
         const selectedRoleIds = this.selectedRoles.map(role => role['value'])
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

         onClickAddUserData(userDetails)
      }
   }

   renderRoles = () => {
      const { formattedRoles, t } = this.props

      return (
         <InputContainer>
            <DropDowWithMultiSelect
               ref={this.roleSelectorRef}
               validate={() => validateSelectedRoles(this.selectedRoles)}
               placeholder={t('iam:users.rolePlaceholder')}
               options={formattedRoles}
               labelText={t('iam:users.addUser.roles')}
               isMulti={true}
               onChange={this.onSelectRoles}
            />
         </InputContainer>
      )
   }
   renderCompanyAndTeamFields = (): React.ReactNode => {
      const { formattedTeams, t, formattedCompanies } = this.props

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
               />
            </InputContainer>
            <InputContainer>
               <DropDowWithMultiSelect
                  ref={this.teamSelectorRef}
                  validate={() => validateSelectedTeams(this.selectedTeams)}
                  placeholder={t('iam:users.teamPlaceholder')}
                  options={formattedTeams}
                  labelText={t('iam:users.addUser.teamsLable')}
                  isMulti={true}
                  onChange={this.onSelectTeams}
               />
            </InputContainer>
         </FiledsWrapper>
      )
   }
   renderNameAndEmail = (): React.ReactNode => {
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

   renderFormFields = (): React.ReactNode => (
      <CardContainer>
         {this.renderNameAndEmail()}
         {this.renderCompanyAndTeamFields()}
         {this.renderRoles()}
      </CardContainer>
   )
   renderFooter = () => {
      const { t, addUserApiStatus, onCancelAddUserData } = this.props
      return (
         <Footer>
            <CancelButton
               type={Button.types.filled}
               variant={Button.variants.control}
               text={t('iam:users.cancelButtonText')}
               onClick={onCancelAddUserData}
               disabled={isFetching(addUserApiStatus)}
            />
            <AddButton
               apiStatus={addUserApiStatus}
               disabled={isFetching(addUserApiStatus)}
               onClick={this.validateUserDetails}
            >
               {t('iam:users.addButtontext')}
            </AddButton>
         </Footer>
      )
   }

   render() {
      const { t } = this.props

      return (
         <UsersWrapper>
            <Wrapper>
               <Title>{t('iam:users.addUser.title')}</Title>
               <Body>
                  <FormWrapper>
                     {this.renderFormFields()}
                     {this.renderFooter()}
                  </FormWrapper>
               </Body>
            </Wrapper>
         </UsersWrapper>
      )
   }
}

export default withTranslation('translation', { withRef: false })(AddUser)
