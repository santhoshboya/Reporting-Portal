import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import { Typo18BrightBlueHKGroteskBold } from '../../styleGuide/Typos'
const PopUpDiv = styled.div`${tw`flex flex-col justify-around items-center`}
   ${tw``}
   width: 100%;
   250px;
`
const UserNmae = styled(Typo18BrightBlueHKGroteskBold)`
   margin: 10px;
`
export { PopUpDiv, UserNmae }
