import React, { Component, ReactNodeArray } from 'react'
import { withTranslation, WithTranslation } from 'react-i18next'

import CompanyModel from '../../stores/models/CompanyModel'
import AddTeamOrCompanyCard from '../../Common/components/AddTeamOrCompanyCard'

import Company from './Company'
import {
   CompaniesWrapper,
   Headline,
   NoCompaniesView,
   NoCompaniesCaption,
   CompaniesListContainer
} from './styledComponents'

interface CompaniesProps extends WithTranslation {
   companies: Array<CompanyModel>
   onClickAddCompany: () => void
   onClickEditCompany: (companyId: string) => void
   onDeleteCompany: (companyId: string, callback: () => void) => Promise<any>
}

class Companies extends Component<CompaniesProps> {
   renderCompanies = (companies: Array<CompanyModel>): ReactNodeArray => {
      const { onDeleteCompany, onClickEditCompany } = this.props
      return companies.map(company => (
         <Company
            onClickEditCompany={onClickEditCompany}
            onDeleteCompany={onDeleteCompany}
            key={company.id}
            company={company}
         />
      ))
   }

   renderCompaniesOrNoCompaniesView = (): JSX.Element => {
      const { companies, t, onClickAddCompany } = this.props
      //NOTE: Need to add as per the screen given
      if (companies.length === 0) {
         return (
            <NoCompaniesView>
               <NoCompaniesCaption>
                  {t('iam:companies.noCompanies')}
               </NoCompaniesCaption>
            </NoCompaniesView>
         )
      }
      return (
         <CompaniesListContainer>
            {this.renderCompanies(companies)}
            <AddTeamOrCompanyCard
               onClickCard={onClickAddCompany}
               label={t('iam:companies.addCompanyLabel')}
            />
         </CompaniesListContainer>
      )
   }

   render() {
      const { t } = this.props
      return (
         <CompaniesWrapper>
            <Headline>{t('iam:companies.heading')}</Headline>
            {this.renderCompaniesOrNoCompaniesView()}
         </CompaniesWrapper>
      )
   }
}

export default withTranslation()(Companies)
