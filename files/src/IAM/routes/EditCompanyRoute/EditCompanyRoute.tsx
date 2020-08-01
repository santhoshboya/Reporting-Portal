import React, { Component } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { observer, inject } from 'mobx-react'

import { API_INITIAL } from '@ib/api-constants'
import LoadingWrapper from '../../../Common/components/LoadingWrapper'

import CompaniesStore from '../../stores/CompaniesStore'
import UserSearchStore from '../../stores/UserSearchStore'
import Company from '../../stores/models/CompanyModel'
import { goToCompaniesPage } from '../../utils/NavigationUtils'
import AddOrEditCompany from '../../components/Companies/AddOrEditCompany'

interface EditCompanyRouteProps extends RouteComponentProps {
   match: any //FIXME: Define type
}

interface InjectedProps extends EditCompanyRouteProps {
   companiesStore: CompaniesStore
   userSearchStore: UserSearchStore
}

@inject('companiesStore', 'userSearchStore')
@observer
class EditCompanyRoute extends Component<EditCompanyRouteProps> {
   companyInstance!: Company

   constructor(props) {
      super(props)
      this.companyInstance = this.companyInstance = this.getInjectedProps().companiesStore.createAndReturnCompanyInstance()
   }

   componentDidMount() {
      this.getData()
   }

   getData = () => {
      this.getInjectedProps().userSearchStore.getUsers()
      this.companyInstance.getSelectedCompanyDetails(this.getCompanyId())
   }

   componentWillUnmount() {
      this.getInjectedProps().userSearchStore.clearStore()
   }

   navigateBack = () => {
      const { history } = this.props
      goToCompaniesPage(history)
   }

   getInjectedProps = (): InjectedProps => this.props as InjectedProps

   getCompanyId = (): string => this.props.match.params.company_id

   getUsers = () => {
      const { usersList } = this.getInjectedProps().userSearchStore
      return Array.from(usersList.values())
   }

   renderSuccessView = observer(() => (
      <AddOrEditCompany
         companyInstance={this.companyInstance}
         goBack={this.navigateBack}
         users={this.getUsers()}
      />
   ))

   getSelectedCompanyStatus = () => {
      if (this.companyInstance) {
         return this.companyInstance.getSelectedCompanyAPIStatus
      }
      this.getSelectedCompanyStatus()
      return API_INITIAL
   }

   render() {
      const {
         getUsersAPIError,
         getUsersAPIStatus
      } = this.getInjectedProps().userSearchStore
      const { getSelectedCompanyAPIStatus } = this.companyInstance
      return (
         <LoadingWrapper
            apiStatus={getUsersAPIStatus & getSelectedCompanyAPIStatus}
            apiError={getUsersAPIError}
            onRetry={this.getData}
            renderSuccessView={this.renderSuccessView}
         />
      )
   }
}

export default withRouter(EditCompanyRoute)
