import styled from '@emotion/styled'
import { TextFontC2Caption } from '../../../Common/styleGuide/Typos/styledComponents'
import { Input } from '../../../Common/components/TextInput/styledComponents'
import colors from '../../../Common/themes/Colors'

export const FieldWrapper = styled.div`
   margin: 10px;
   flex-basis: 320px;
`

export const Label = styled(TextFontC2Caption)`
   font-size: 12px;
   font-weight: 600;
   font-stretch: normal;
   font-style: normal;
   line-height: 1.33;
   letter-spacing: 0.12px;
   color: ${colors.steel};
   display: inline-block;
   margin-bottom: 8px;
`

export const TextAreaTypo = styled(Input)`
   height: 108px;
   width: 320px;
`
