import styled from 'styled-components'
import tw from 'twin.macro'
import { css } from '@emotion/core'

type StyledButtonProps = {
   isSelected: boolean
   isInlined: boolean
}

export const StyledButton = styled.button`
   min-width: 72px;
   max-width: 120px;
   background: white;
   border: 2px solid transparent;
   flex-direction: ${(props: StyledButtonProps) =>
      props.isInlined ? 'row' : 'column'};

   ${(props: StyledButtonProps) =>
      props.isSelected ? `border-bottom-color:blue;color:blue` : ``};

   ${tw`p-1 focus:outline-none cursor-pointer flex items-center justify-center `}
`
export const wrapText = css`
   min-width: 40px;
   max-width: 90px;
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;
`
