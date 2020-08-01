import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { withTranslation, WithTranslation } from 'react-i18next'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import { Avatar } from '../Avatar'
import Button from '../Button'

import { goToLoginRoute } from '../../../UserProfile/utils/NavigationUtils'

import {
   WelcomeText,
   Text,
   LeftPaneWrapper,
   RightPaneWrapper,
   HeaderContainer
} from './styledComponents'

interface UserProfileDetailsHeaderProps
   extends RouteComponentProps,
      WithTranslation {
   userName: string
   profilePicURL: string
   logout: () => void
   isLoggingout: boolean
}

@observer
class UserProfileDetailsHeader extends Component<
   UserProfileDetailsHeaderProps
> {
   handleLogout = async () => {
      await this.props.logout()
      goToLoginRoute(this.props.history)
   }

   render() {
      const { handleLogout } = this
      const { userName, profilePicURL, isLoggingout, t } = this.props

      return (
         <HeaderContainer>
            <LeftPaneWrapper>
               <WelcomeText>
                  {t('common:UserProfileDetailsHeader.welcome')}
               </WelcomeText>
            </LeftPaneWrapper>
            <RightPaneWrapper>
               <Text>{userName}</Text>
               <Avatar
                  variant={Avatar.variant.circle}
                  avatarType={Avatar.avatarType.filled}
                  username={userName}
                  src={profilePicURL}
                  altMessage={userName}
               />
               <Button
                  width='100px'
                  size={Button.sizes.medium}
                  onClick={handleLogout}
                  isLoading={isLoggingout}
               >
                  {t('common:UserProfileDetailsHeader.logout')}
               </Button>
            </RightPaneWrapper>
         </HeaderContainer>
      )
   }
}

export default withRouter(withTranslation()(UserProfileDetailsHeader))
