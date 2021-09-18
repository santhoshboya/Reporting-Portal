import tw, { styled } from 'twin.macro'

import Card from '../../../../Common/components/Card'
import { customDevice } from '../../../../Common/utils/MixinUtils'
import TextInput from '../../../../Common/components/TextInput'
import Button from '../../../../Common/components/Button'
import DropDown from '../../../../Common/components/DropDown'

export const Body = styled.div`
   ${tw`flex flex-col  items-center`}
`
export const FormWrapper = styled.div`
   ${tw``}
`

export const FiledsWrapper = styled.div`
   ${tw`flex justify-between `}
`
export const Form = styled.div``

export const CardContainer = styled(Card)`
   ${customDevice(1024, 1300)} {
      ${tw`w-3/5`}
   }
   ${tw`flex-col shadow rounded-lg items-center bg-white p-4`};
   width: 800px;
`
export const InputContainer = styled.div`
   ${tw`flex-1 flex-col justify-center m-4`}
`
export const Label = styled.p`
   ${tw`flex self-start uppercase leading-snug mt-2 tracking-wide text-steel`}
`
export const InputBox = styled(TextInput)`
   ${tw`flex rounded-sm flex-1`}
`
export const Footer = styled.div`
   ${tw`flex justify-end  m-4`}
`
export const CancelButton = styled(Button)`
   ${tw`text-red-500 border border-black border-solid outline-none mr-6`}
`
export const Wrapper = styled.div`
   ${tw` bg-gray-100 min-h-screen p-10 flex-1`}
`

export const DropDownContainer = styled(DropDown)`
   ${tw`flex-1 text-xl`}
`
export const ErrorWapper = styled.div`
   ${tw`text-red-500 flex justify-center`}
`
