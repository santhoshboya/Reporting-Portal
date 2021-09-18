import React, { Component } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import { observer } from 'mobx-react'
import { observable } from 'mobx'

import PlusIcon from '../../../../Common/icons/PlusIcon'

import { navigateToAddUserScreen } from '../../../utils/NavigationUtils'

import SearchBar from '../SearchBar/SearchBar'

import {
   UsersListHeaderWrapper,
   Title,
   TextInputWrapper,
   HeaderActionsContainer,
   AddButton
} from './styledComponents'

interface WithTranslationProps {
   t: any
   i18n: any
   tReady: boolean
}
//FIXME:resolve withTranslation import issue
interface UsersListHeaderProps
   extends WithTranslationProps,
      RouteComponentProps {
   onChangeUsersSearchText: (text: string) => void
   getUserDetails: () => void
}

@observer
class UsersListHeader extends Component<UsersListHeaderProps> {
   @observable searchText!: string

   constructor(props) {
      super(props)
      this.searchText = ''
   }

   onClickAddUser = () => {
      const { history } = this.props
      navigateToAddUserScreen(history)
   }

   isEnterKeyPressed = (event: KeyboardEvent) => {
      event.keyCode === 13 && this.props.getUserDetails()
      if (event.keyCode === 13) this.searchText = ''
   }

   onChangeSearchTextValue = (value: string) => {
      const { onChangeUsersSearchText } = this.props
      this.searchText = value
      onChangeUsersSearchText(value)
   }

   render() {
      const { t } = this.props
      const {
         searchText,
         onChangeSearchTextValue,
         onClickAddUser,
         isEnterKeyPressed
      } = this

      return (
         <UsersListHeaderWrapper>
            <Title>{t('iam:users.title')}</Title>

            <HeaderActionsContainer>
               <TextInputWrapper>
                  <SearchBar
                     searchText={searchText}
                     onChangeSearchText={onChangeSearchTextValue}
                     onKeyDown={isEnterKeyPressed}
                  />
               </TextInputWrapper>
               <AddButton onClick={onClickAddUser}>
                  <PlusIcon />
                  {t('iam:users.addButtontext')}
               </AddButton>
            </HeaderActionsContainer>
         </UsersListHeaderWrapper>
      )
   }
}

export default withRouter(
   withTranslation('translation', { withRef: false })(UsersListHeader)
)
