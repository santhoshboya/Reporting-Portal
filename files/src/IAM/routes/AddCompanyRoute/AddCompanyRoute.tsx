import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { withTranslation, WithTranslation } from 'react-i18next'
import { RouteComponentProps, withRouter } from 'react-router-dom'

import LoadingWrapper from '../../../Common/components/LoadingWrapper'

import AddOrEditCompany from '../../components/Companies/AddOrEditCompany'
import CompaniesStore from '../../stores/CompaniesStore'
import { goToCompaniesPage } from '../../utils/NavigationUtils'
import UserSearchStore from '../../stores/UserSearchStore'
import { PostOrPutCompanyObject } from '../../stores/types'
import Company from '../../stores/models/CompanyModel'

interface AddCompanyRouteProps extends RouteComponentProps, WithTranslation {}

interface InjectedProps extends AddCompanyRouteProps {
   companiesStore: CompaniesStore
   userSearchStore: UserSearchStore
}

@inject('companiesStore', 'userSearchStore')
@observer
class AddCompanyRoute extends Component<AddCompanyRouteProps> {
   companyInstance!: Company
   componentDidMount() {
      this.getData()
   }

   getData = () => {
      this.getInjectedProps().userSearchStore.getUsers()
      this.companyInstance = this.getInjectedProps().companiesStore.createAndReturnCompanyInstance()
   }

   componentWillUnmount() {
      this.getInjectedProps().userSearchStore.clearStore()
   }

   goBack = () => {
      const { history } = this.props
      goToCompaniesPage(history)
   }

   getInjectedProps = (): InjectedProps => this.props as InjectedProps

   getUsers = () => {
      const { usersList } = this.getInjectedProps().userSearchStore
      return Array.from(usersList.values())
   }

   onSaveCompanyDetails = (
      company: PostOrPutCompanyObject,
      onSuccess: (name: string) => void
   ) => {
      const { onAddCompany } = this.getInjectedProps().companiesStore

      onAddCompany(company, onSuccess)
   }

   renderSuccessView = observer(() => {
      const {
         postCompaniesAPIError,
         postCompaniesAPIStatus
      } = this.getInjectedProps().companiesStore
      const { t } = this.props
      return (
         <AddOrEditCompany
            addApiStatus={postCompaniesAPIStatus}
            addAPIError={postCompaniesAPIError}
            onAddCompany={this.onSaveCompanyDetails}
            companyInstance={this.companyInstance}
            toastMessage={t('common:toastMessages.addSuccessToast')}
            heading={t('iam:companies.addOrEditCompany.addCompany')}
            users={this.getUsers()}
            goBack={this.goBack}
         />
      )
   })

   render() {
      const {
         getUsersAPIStatus,
         getUsersAPIError,
         getUsers
      } = this.getInjectedProps().userSearchStore
      return (
         <LoadingWrapper
            apiError={getUsersAPIError}
            apiStatus={getUsersAPIStatus}
            onRetry={getUsers}
            renderSuccessView={this.renderSuccessView}
         />
      )
   }
}

export default withRouter(withTranslation()(AddCompanyRoute))
