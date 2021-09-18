import styled from 'styled-components'
import tw from 'twin.macro'

import Card from '../../../Common/components/Card'
import { TextFontC2CaptionPimary500Default } from '../../../Common/styleGuide/Typos'

export const TaskCard = styled(Card)`
   ${tw`
        shadow-md bg-white flex-grow p-16px
    `};

   min-width: 200px;
   border-top: 4px solid ${props => props.color};
`
export const TaskWrapper = styled('div')`
   ${tw` flex-grow h-full`};
   cursor: grab;
`
export const TaskButton = styled(TextFontC2CaptionPimary500Default)`
   ${tw`text-xs p-1 w-78px h-24px truncate text-center rounded bg-transparentPrimary8 text-primary500Default`};
`
export const Wrapper = styled('div')`
   ${tw` flex justify-between items-center`};
`
