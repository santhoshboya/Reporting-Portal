import React, { Component, ReactNode } from 'react'
import { withTranslation, WithTranslation } from 'react-i18next'

import { Avatar } from '../../../../Common/components/Avatar'
import { toastTypes } from '../../../../Common/constants/ToastTypes'
import { showToast } from '../../../../Common/utils/ToastUtils/ToastUtil'
import { showConfirmDialog } from '../../../../Common/utils/ConfirmationDialogUtils'
import PopoverMenu from '../../../../Common/components/PopoverMenu'
import {
   VARIANT,
   AVATAR_TYPE,
   SIZES
} from '../../../../Common/components/Avatar/constants'

import {
   CHAR_LIMIT,
   MORE_DOTS
} from '../../../Common/constants/stringConstants'
import CompanyModel from '../../../stores/models/CompanyModel'

import {
   CompanyContainer,
   CompanyCardHeader,
   CompanyTitle,
   CompanyTitleWrapper,
   IconContainer,
   CompanyDescription,
   EmployeesCount,
   ListMenuItem,
   ListMenuContainer,
   AlertMessageTypo
} from './styledComponents'

interface CompanyProps extends WithTranslation {
   company: CompanyModel
   onClickEditCompany: (companyId: string) => void
   onDeleteCompany: (companyId: string, callback: () => void) => Promise<any>
}

class Company extends Component<CompanyProps> {
   getDescription = (): string => {
      const { description } = this.props.company
      if (description.length > CHAR_LIMIT) {
         return description.substring(0, CHAR_LIMIT) + MORE_DOTS
      }
      return description
   }

   showToast = () => {
      const { t } = this.props
      const toastProps = {
         message: t('common:toastMessages.deleteSuccessToast'),
         type: toastTypes.success
      }
      showToast(toastProps)
   }

   renderMenuItems = (): ReactNode => {
      const { t, onClickEditCompany, onDeleteCompany } = this.props
      const { id } = this.props.company
      return (
         <ListMenuContainer>
            <ListMenuItem
               key={t('iam:companies.company.edit')}
               onClick={_e => onClickEditCompany(id)}
            >
               {t('iam:companies.company.edit')}
            </ListMenuItem>
            <ListMenuItem
               key={t('iam:companies.company.delete')}
               onClick={() =>
                  showConfirmDialog({
                     MessageTypo: AlertMessageTypo,
                     message: t('iam:companies.company.alertMessage'),
                     onConfirm: () => onDeleteCompany(id, this.showToast)
                  })
               }
            >
               {t('iam:companies.company.delete')}
            </ListMenuItem>
         </ListMenuContainer>
      )
   }

   render() {
      const { t } = this.props
      const { name, logoURL, noOfEmployees } = this.props.company
      return (
         <CompanyContainer>
            <CompanyCardHeader>
               <CompanyTitleWrapper>
                  <Avatar
                     variant={VARIANT.SQUARE}
                     avatarType={AVATAR_TYPE.OUTLINE}
                     avatarSize={SIZES.MEDIUM}
                     altMessage={name}
                     src={logoURL}
                     username={name}
                  />
                  <CompanyTitle>{name}</CompanyTitle>
               </CompanyTitleWrapper>
               <IconContainer>
                  <PopoverMenu renderPopoverContent={this.renderMenuItems()} />
               </IconContainer>
            </CompanyCardHeader>
            <CompanyDescription>{this.getDescription()}</CompanyDescription>
            <EmployeesCount>
               {t('iam:companies.employees', { count: noOfEmployees })}
            </EmployeesCount>
         </CompanyContainer>
      )
   }
}

export default withTranslation()(Company)
