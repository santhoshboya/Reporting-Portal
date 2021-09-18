import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { withTranslation } from 'react-i18next'

// TODO: Handle Image Implementation
import IBHubsLogo from '../../components/IBHubsLogo'
// TODO: Handle Image Implementation
import TimeInfoPageImage from '../../components/TimeInfoPageImage'

import {
   FORGOT_PASSWORD_ROUTE_PATH,
   LOGIN_ROUTE_PATH,
   SIGNUP_ROUTE_PATH
} from '../../constants/NavigationConstants'

import {
   LinkHasExpiredContainer,
   LeftPaneContainer,
   ContentCenterWrapper,
   RightPaneContainer,
   WelcomeText,
   NavigatingContainer,
   LinkText,
   Text
} from './styledComponents'

interface WithTranslationProps {
   t: any
   i18n: any
   tReady: boolean
}

interface LinkHasExpiredRouteProps extends WithTranslationProps {
   // TODO: optimize this es-lint error
   any: any
}

@observer
class LinkHasExpiredRoute extends Component<LinkHasExpiredRouteProps> {
   prefixForT = 'userProfile:linkHasExpired.'

   render() {
      const {
         props: { t },
         prefixForT
      } = this

      // TODO: Update this entire with respect to the Zeplin screen Provided

      return (
         <LinkHasExpiredContainer>
            <LeftPaneContainer>
               <ContentCenterWrapper>
                  <IBHubsLogo />
                  <WelcomeText>{t(`${prefixForT}welcomeText`)}</WelcomeText>
                  <Text>{t(`${prefixForT}goBackTo`)}</Text>
                  <NavigatingContainer>
                     <LinkText as='a' href={LOGIN_ROUTE_PATH}>
                        {t(`${prefixForT}login`)}
                        &nbsp;
                     </LinkText>
                     ||
                     <LinkText as='a' href={FORGOT_PASSWORD_ROUTE_PATH}>
                        &nbsp;
                        {t(`${prefixForT}forgotPassword`)}
                        &nbsp;
                     </LinkText>
                     ||
                     <LinkText as='a' href={SIGNUP_ROUTE_PATH}>
                        &nbsp;
                        {t(`${prefixForT}signup`)}
                     </LinkText>
                  </NavigatingContainer>
               </ContentCenterWrapper>
            </LeftPaneContainer>
            <RightPaneContainer>
               <TimeInfoPageImage />
            </RightPaneContainer>
         </LinkHasExpiredContainer>
      )
   }
}

export default withTranslation()(LinkHasExpiredRoute)
