import React, { Component } from 'react'

import { observer } from 'mobx-react'

import {
   getFirstTwoLettersFromGivenName,
   changeGivenTextToUpperCase
} from '../../utils/HelperUtils'
import {
   AvatarWrapper,
   AvatarWithUrl,
   AvatarWithInitial
} from './styledComponents'
import { SIZES, VARIANT, AVATAR_TYPE } from './constants'

interface AvatarProps {
   variant: string
   avatarType: string
   username: string
   src: string
   altMessage: string
   avatarSize?: string | undefined
}

@observer
class Avatar extends Component<AvatarProps> {
   static sizes = {
      small: SIZES.SMALL,
      extraSmall: SIZES.EXTRA_SMALL,
      extraLarge: SIZES.EXTRA_LARGE,
      large: SIZES.LARGE,
      medium: SIZES.MEDIUM
   }

   static variant = {
      circle: VARIANT.CIRCLE,
      square: VARIANT.SQUARE
   }
   static avatarType = {
      filled: AVATAR_TYPE.FILLED,
      outline: AVATAR_TYPE.OUTLINE
   }

   renderAvatar = () => {
      const {
         variant,
         avatarSize,
         avatarType,
         src,
         altMessage,
         username
      } = this.props
      const givenUsername = changeGivenTextToUpperCase(username)
      if (src && src !== '') {
         return (
            <AvatarWithUrl
               src={src}
               avatarSize={avatarSize}
               type={avatarType}
               variant={variant}
               alt={altMessage}
            />
         )
      }
      return (
         <AvatarWithInitial
            avatarType={avatarType}
            size={avatarSize}
            variant={variant}
         >
            {getFirstTwoLettersFromGivenName(givenUsername)}
         </AvatarWithInitial>
      )
   }

   render() {
      return <AvatarWrapper>{this.renderAvatar()}</AvatarWrapper>
   }
}

export { Avatar }
