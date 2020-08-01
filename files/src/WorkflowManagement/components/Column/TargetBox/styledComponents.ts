import styled from 'styled-components'
import tw from 'twin.macro'

import {
   TextFontLabelBasic600,
   TextFontC1CaptionBasic500
} from '../../../../Common/styleGuide/Typos'
import Colors from '../../../../Common/themes/Colors'

function getColorFromActiveStatus(isActive) {
   return isActive ? Colors.primary500Default : Colors.basic500
}
function getBorderColorFromActiveStatus(isActive) {
   return isActive ? Colors.primary500Default : Colors.basic300
}

export const TargetWrapper = styled('div')`
   ${tw`flex  items-center justify-center px-2 my-2`};
   min-height: 190px;
   min-width: 200px;
   border: 1px dashed ${props => getBorderColorFromActiveStatus(props.isActive)};
`

export const BoxTitle = styled(TextFontLabelBasic600)`
   ${tw`text-sm`}
`
export const BoxPlaceHolder = styled(TextFontC1CaptionBasic500)`
   ${tw`flex items-center justify-center`};
   color: ${props => getColorFromActiveStatus(props.isActive)};
`

export const Container = styled('div')`
   width: 40%;
`
