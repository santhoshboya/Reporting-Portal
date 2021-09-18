import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { RouteComponentProps, withRouter } from 'react-router-dom'

import LoadingWrapper from '../../../Common/components/LoadingWrapper'

import CompaniesStore from '../../stores/CompaniesStore'
import CompanyModel from '../../stores/models/CompanyModel'
import Companies from '../../components/Companies'
import {
   goToAddCompanyPage,
   goToEditCompanyPage
} from '../../utils/NavigationUtils'
import withSlimbarControllerRoute, {
   routeInfo,
   expandedIAMItemsInfo
} from '../../../hocs/withSlimbarControllerRoute'

interface CompaniesRouteProps extends RouteComponentProps {
   any?: any
}

interface InjectedProps extends CompaniesRouteProps {
   companiesStore: CompaniesStore
}

@inject('companiesStore')
@observer
class CompaniesRoute extends Component<CompaniesRouteProps> {
   componentDidMount() {
      this.getCompaniesStore().getCompanies()
   }

   componentWillUnmount() {
      this.getCompaniesStore().clearStore()
   }

   getInjectedProps = (): InjectedProps => this.props as InjectedProps

   getCompaniesStore = () => this.getInjectedProps().companiesStore

   getCompaniesList = (): Array<CompanyModel> => {
      const { companiesList } = this.getCompaniesStore()
      if (companiesList) {
         return Array.from(companiesList.values())
      }
      return []
   }

   goToAddCompanyPage = () => {
      const { history } = this.props
      goToAddCompanyPage(history)
   }

   goToEditCompanyPage = (companyId: string) => {
      const { history } = this.props
      goToEditCompanyPage(history, companyId)
   }

   renderSuccessView = observer(() => {
      const { deleteCompany } = this.getCompaniesStore()
      return (
         <Companies
            onClickEditCompany={this.goToEditCompanyPage}
            onClickAddCompany={this.goToAddCompanyPage}
            onDeleteCompany={deleteCompany}
            companies={this.getCompaniesList()}
         />
      )
   })

   render() {
      const {
         getCompaniesAPIStatus,
         getCompaniesAPIError,
         deleteCompaniesAPIStatus,
         getCompanies
      } = this.getCompaniesStore()
      return (
         <LoadingWrapper
            apiStatus={getCompaniesAPIStatus | deleteCompaniesAPIStatus}
            apiError={getCompaniesAPIError}
            onRetry={getCompanies}
            renderSuccessView={this.renderSuccessView}
         />
      )
   }
}

export default withSlimbarControllerRoute(CompaniesRoute, {
   defaultActiveSlimbarCollapsedId: routeInfo.iam,
   defaultActiveSlimbarExpandedId: expandedIAMItemsInfo.companies,
   defaultIsExpanded: true
})
