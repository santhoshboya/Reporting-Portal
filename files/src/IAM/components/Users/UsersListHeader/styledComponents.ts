import tw, { styled } from 'twin.macro'

import { Typo26BlackHKGrotesk } from '../../../../Common/styleGuide/Typos'
import Button from '../../../../Common/components/Button'

export const UsersListHeaderWrapper = styled.div`
   ${tw`m-2`}
`
export const Title = styled(Typo26BlackHKGrotesk)`
   ${tw``}
`
export const HeaderActionsContainer = styled.div`
   ${tw`flex justify-between mr-2 mt-6`}
`
export const TextInputWrapper = styled.div`
   ${tw`w-1/4 `}
`

interface AddButtonProps {
   apiStatus: number
}
export const AddButton = styled(Button)<AddButtonProps>`
   ${tw`bg-blue-700 outline-none text-center border-none`};
   ${props => (props.apiStatus === 100 ? tw`cursor-not-allowed` : tw``)}
`
