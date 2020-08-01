import React from 'react'

import AddIcon from '../../../../Common/icons/AddIcon'

import { MoreAvatarWrapper } from './styledComponents'

type Props = {
   noOfremainingAvatars: number
}

const MoreAvatar = (props: Props) => (
   <MoreAvatarWrapper>
      <AddIcon height={10} width={10} />
      {props.noOfremainingAvatars}
   </MoreAvatarWrapper>
)

export default MoreAvatar
