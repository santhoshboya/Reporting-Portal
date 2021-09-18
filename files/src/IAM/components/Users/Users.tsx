import React, { Component } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import { observer } from 'mobx-react'

import { navigateToAddUserScreen } from '../../utils/NavigationUtils'
import { UserModel } from '../../stores/models/UserModel'

import { UserList } from './UserList'
import { IAMUsersWrapper } from './styledComponents'

interface WithTranslationProps {
   t: any
   i18n: any
   tReady: boolean
}

interface UsersProps extends WithTranslationProps, RouteComponentProps {
   usersList?: Array<UserModel>
   searchText?: string
   navigateToEditDetailsScreen: (userId: string) => void
   onClickDeleteUser: (userId: string) => void
   offset: number
}

@observer
class Users extends Component<UsersProps> {
   onClickAddUser = () => {
      const { history } = this.props
      navigateToAddUserScreen(history)
   }
   onClickDeleteUser = (userId: string) => {
      const { onClickDeleteUser } = this.props
      onClickDeleteUser(userId)
   }

   render() {
      const { navigateToEditDetailsScreen, usersList, offset } = this.props
      return (
         <IAMUsersWrapper>
            <UserList
               offset={offset}
               onClickDeleteUser={this.onClickDeleteUser}
               usersList={usersList}
               navigateToEditDetailsScreen={navigateToEditDetailsScreen}
            />
         </IAMUsersWrapper>
      )
   }
}

export default withRouter(
   withTranslation('translation', { withRef: false })(Users)
)
