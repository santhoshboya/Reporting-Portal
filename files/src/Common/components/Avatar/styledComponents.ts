import tw, { styled } from 'twin.macro'

import colors from '../../themes/Colors'
import { getRandomItemFromGivenArray } from '../../utils/HelperUtils'
import { AVATAR_TYPE, VARIANT, SIZES, WIDTH } from './constants'

const randomColors = [
   {
      backgroundColor: colors.info500,
      textColor: colors.info900
   },
   {
      backgroundColor: colors.warning100,
      textColor: colors.warning600Default
   },
   { backgroundColor: colors.extraOrange100, textColor: colors.extraOrange400 },
   //TODO:changeName pimary900 -> primary900
   { backgroundColor: colors.pimary900, textColor: colors.pimary400 }
]

export const AvatarWrapper = styled.div`
   object-fit: contain;
`

const getSize = size => {
   switch (size) {
      case SIZES.SMALL:
         return WIDTH.SMALL
      case SIZES.EXTRA_LARGE:
         return WIDTH.EXTRA_LARGE
      case SIZES.EXTRA_SMALL:
         return WIDTH.EXTRA_SMALL
      case SIZES.LARGE:
         return WIDTH.LARGE
      default:
         return WIDTH.MEDIUM
   }
}

const getBackground = type => {
   const color = getRandomItemFromGivenArray(randomColors)
   switch (type) {
      case AVATAR_TYPE.OUTLINE:
         return {
            background: colors.white,
            border: `2px solid ${color.backgroundColor}`,
            color: color.textColor
         }
      default:
         return {
            background: color.backgroundColor,
            color: colors.white
         }
   }
}
const getVariant = variant => {
   switch (variant) {
      case VARIANT.SQUARE:
         return '5px'
      default:
         return '50%'
   }
}

interface AvatarWithInitialProps {
   avatarType: string
   avatarSize: string | undefined
   variant: string
}
interface Props {
   avatarSize: string | undefined
   type: string
   variant: string
}

export const AvatarWithUrl = styled.img<Props>`
   width: ${props => `${getSize(props.avatarSize)}px`};
   height: ${props => `${getSize(props.avatarSize)}px`};
   border-radius: ${props => getVariant(props.variant)};
`
export const AvatarWithInitial = styled.div<AvatarWithInitialProps>`
   ${tw`flex justify-center items-center`};
   ${props => getBackground(props.avatarType)};
   width: ${props => `${getSize(props.size)}px`};
   height: ${props => `${getSize(props.size)}px`};
   border-radius: ${props => getVariant(props.variant)};
`
