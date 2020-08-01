import React from 'react'
import { withKnobs, select, text } from '@storybook/addon-knobs'

import { VARIANT, AVATAR_TYPE } from './constants'
import { Avatar } from './index'

export default {
   title: 'Avatar'
}

export const AvatarWithCircularImage = () => (
   <Avatar
      variant={VARIANT.CIRCLE}
      avatarType={AVATAR_TYPE.FILLED}
      username={'iBDeveloper'}
      src={
         'https://res.cloudinary.com/due4dmz2b/image/fetch/dpr_auto,w_auto,f_auto,q_auto/https://proyuga-media-assets.s3.ap-south-1.amazonaws.com/ib-cricket-logo-reg.png'
      }
      altMessage={'iBCricket-logo'}
      avatarSize={Avatar.sizes.large}
   />
)

const variant = 'variant'
const avatarType = 'avatarType'

const avatarTypeOptions = {
   filled: AVATAR_TYPE.FILLED,
   outline: AVATAR_TYPE.OUTLINE
}

const variantDefaultValue = VARIANT.CIRCLE

const avatarTypeDefaultValue = AVATAR_TYPE.FILLED

export const AvatarKnobs = () => (
   <Avatar
      src={''}
      altMessage={text('alt', 'iB-logo')}
      username={text('username', 'iBDeveloper')}
      variant={select(variant, VARIANT, variantDefaultValue)}
      avatarType={select(avatarType, AVATAR_TYPE, avatarTypeDefaultValue)}
      avatarSize={text('size', 'M')}
   />
)

AvatarKnobs.story = {
   decorators: [withKnobs]
}
