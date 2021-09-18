import React, { Component } from 'react'
import { reaction } from 'mobx'
import { observer } from 'mobx-react'
import { withTranslation, WithTranslation } from 'react-i18next'
import { APIStatus, API_FAILED, API_SUCCESS } from '@ib/api-constants'

import { toastTypes } from '../../../../Common/constants/ToastTypes'
import { showToast } from '../../../../Common/utils/ToastUtils/ToastUtil'
import { getFormattedAPIErrorDescription } from '../../../../Common/utils/APIErrorUtils'
import BackArrowIcon from '../../../../Common/icons/BackArrowIcon'
import DropDowWithMultiSelect from '../../../../Common/components/DropDownWithMultiSelect'
import TextInput from '../../../../Common/components/TextInput'
import TextArea from '../../../../Common/components/TextInput/TextArea'
import CommonButton from '../../../../Common/components/Button'

import { EMPTY_STRING } from '../../../Common/constants/stringConstants'
import UserOptionModel from '../../../stores/models/UserOptionModel'
import Company from '../../../stores/models/CompanyModel'
import { PostOrPutCompanyObject } from '../../../stores/types'

import {
   EditOrAddCompanyWrapper,
   GoBack,
   BackCaption,
   EditOrAddCompanyHeadline,
   CompanyDetailsWrapper,
   CompanyDetailsContainer,
   CompanyDetailsHeadingContainer,
   CompanyDetailsHeading,
   CompanyNameContainer,
   CompanyDescriptionContainer,
   SaveButtonContainer,
   EditOrAddEmployeesContainer,
   SelectedEmployeesContainer,
   SelectedEmployee
} from './styledComponents'

interface AddOrEditCompanyProps extends WithTranslation {
   goBack: () => void
   heading?: string
   addApiStatus?: APIStatus
   addAPIError?: Error | null
   onAddCompany?: (company: PostOrPutCompanyObject, onSuccess) => void
   companyInstance: Company
   toastMessage?: string
   users: Array<UserOptionModel>
}

@observer
class AddOrEditCompany extends Component<AddOrEditCompanyProps> {
   companyNameRef = React.createRef<TextInput>()

   componentWillUnmount() {
      this.goBackReaction()
      this.apiErrorReaction()
   }

   onChangeCompanyName = (e: any) => {
      const { onChangeCompanyName } = this.props.companyInstance
      onChangeCompanyName(e.target.value)
   }

   onChangeCompanyDescription = (e: any) => {
      const { onChangeCompanyDescription } = this.props.companyInstance
      onChangeCompanyDescription(e.target.value)
   }

   goBackReaction = reaction(
      (): boolean => {
         const { addApiStatus } = this.props
         const { putCompanyDetailsAPIStatus } = this.props.companyInstance
         const addOrEditAPIStatus = addApiStatus
            ? addApiStatus
            : putCompanyDetailsAPIStatus
         return addOrEditAPIStatus === API_SUCCESS
      },
      (_: boolean): void => {
         const { goBack } = this.props
         goBack()
      }
   )

   isNameError = (errorMessage: string) => {
      const { t } = this.props
      return errorMessage.includes(
         t('iam:companies.addOrEditCompany.nameExistError')
      )
   }

   apiErrorReaction = reaction(
      (): boolean => {
         const { addApiStatus } = this.props
         const { putCompanyDetailsAPIStatus } = this.props.companyInstance
         const addOrEditAPIStatus = addApiStatus
            ? addApiStatus
            : putCompanyDetailsAPIStatus
         return addOrEditAPIStatus === API_FAILED
      },
      _ => {
         const { addAPIError } = this.props
         const { putCompanyDetailsAPIError } = this.props.companyInstance
         const addOrEditAPIError = getFormattedAPIErrorDescription(
            addAPIError ? addAPIError : putCompanyDetailsAPIError
         )
         this.showToast(EMPTY_STRING, addOrEditAPIError, toastTypes.danger)
         if (this.isNameError(addOrEditAPIError)) {
            this.companyNameRef.current?.inputRef.current.setError(
               addOrEditAPIError
            )
         }
      }
   )

   showToast = (name: string, errorMessage?: string, type?: string) => {
      const { t, toastMessage } = this.props
      const toastType = type ? type : toastTypes.success
      const message = errorMessage
         ? errorMessage
         : toastMessage
         ? toastMessage
         : t('common:toastMessages.updateSuccessToast')
      const toastProps = {
         message: `${name}${message}`,
         type: toastType
      }
      showToast(toastProps)
   }

   getAPIStatus = () => {
      const { addApiStatus } = this.props
      const { putCompanyDetailsAPIStatus } = this.props.companyInstance
      return addApiStatus ? addApiStatus : putCompanyDetailsAPIStatus
   }

   isEmptyString = (value: string) => value === EMPTY_STRING

   validateCompanyName = () => {
      const { t } = this.props
      const { name } = this.props.companyInstance
      if (this.isEmptyString(name)) {
         return {
            shouldShowError: true,
            errorMessage: t('iam:companies.addOrEditCompany.emptyNameError')
         }
      }
      return {
         shouldShowError: false,
         errorMessage: EMPTY_STRING
      }
   }

   isError = () => {
      this.companyNameRef.current?.validateInput()
      return this.companyNameRef.current?.isError
   }

   getOptions = users => {
      if (users) {
         return users.map(user => ({
            value: user.id ? user.id : user.employee_id,
            label: user.name
         }))
      }
   }

   getEmployees = options =>
      options.map(option => ({ employee_id: option.value, name: option.label }))

   onChangeSelectedEmployees = (employeeOptions: any) => {
      const { onChangeEmployees } = this.props.companyInstance
      if (employeeOptions) {
         onChangeEmployees(this.getEmployees(employeeOptions))
         return
      }
      onChangeEmployees([])
   }

   renderSelectedEmployees = () => {
      const { employees } = this.props.companyInstance
      if (employees) {
         return employees.map(employee => (
            <SelectedEmployee key={employee.employee_id}>
               {employee.name}
            </SelectedEmployee>
         ))
      }
   }

   onSaveCompanyDetails = () => {
      const { onAddCompany } = this.props
      const {
         getRequestObject,
         updateCompanyDetails
      } = this.props.companyInstance

      if (this.isError()) {
         return
      }

      if (onAddCompany) {
         onAddCompany(getRequestObject(), this.showToast)
         return
      }
      updateCompanyDetails(this.showToast)
   }

   render() {
      const { t, heading, goBack, users } = this.props
      const { name, description, employees } = this.props.companyInstance
      return (
         <EditOrAddCompanyWrapper>
            <GoBack onClick={goBack}>
               <BackArrowIcon />
               <BackCaption>
                  {t('iam:companies.addOrEditCompany.back')}
               </BackCaption>
            </GoBack>
            <EditOrAddCompanyHeadline>
               {heading || t('iam:companies.addOrEditCompany.editCompany')}
            </EditOrAddCompanyHeadline>
            <CompanyDetailsWrapper>
               <CompanyDetailsContainer>
                  <CompanyDetailsHeadingContainer>
                     <CompanyDetailsHeading>
                        {t('iam:companies.addOrEditCompany.details')}
                     </CompanyDetailsHeading>
                  </CompanyDetailsHeadingContainer>
                  <CompanyNameContainer>
                     <TextInput
                        ref={this.companyNameRef}
                        value={name}
                        onChange={this.onChangeCompanyName}
                        validate={this.validateCompanyName}
                        placeholder={t(
                           'iam:companies.addOrEditCompany.namePlaceholder'
                        )}
                        label={t('iam:companies.addOrEditCompany.nameLabel')}
                     />
                  </CompanyNameContainer>
                  <CompanyDescriptionContainer>
                     <TextArea
                        value={description}
                        onChange={this.onChangeCompanyDescription}
                        placeholder={t(
                           'iam:companies.addOrEditCompany.descriptionPlaceholder'
                        )}
                        label={t(
                           'iam:companies.addOrEditCompany.descriptionLabel'
                        )}
                     />
                  </CompanyDescriptionContainer>
                  <EditOrAddEmployeesContainer>
                     <DropDowWithMultiSelect
                        placeholder={t(
                           'iam:companies.addOrEditCompany.employeesPlaceholder'
                        )}
                        isMulti={true}
                        onChange={this.onChangeSelectedEmployees}
                        options={this.getOptions(users)}
                        labelText={t(
                           'iam:companies.addOrEditCompany.employeesLabel'
                        )}
                        defaultValue={this.getOptions(employees)}
                     />
                     <SelectedEmployeesContainer>
                        {this.renderSelectedEmployees()}
                     </SelectedEmployeesContainer>
                  </EditOrAddEmployeesContainer>
               </CompanyDetailsContainer>
               <SaveButtonContainer>
                  <CommonButton
                     onClick={this.onSaveCompanyDetails}
                     apiStatus={this.getAPIStatus()}
                     text={t('iam:companies.addOrEditCompany.button')}
                  />
               </SaveButtonContainer>
            </CompanyDetailsWrapper>
         </EditOrAddCompanyWrapper>
      )
   }
}

export default withTranslation()(AddOrEditCompany)
