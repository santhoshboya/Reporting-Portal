import styled from '@emotion/styled'
import Button from '../../../Common/components/Button'

export const StageSelector = styled.div`
   width: 800px;
`

export const StageActions = styled.div`
   width: 800px;
   display: flex;
   justify-content: flex-end;
   margin-bottom: 20px;
`

export const UiWrapper = styled.div`
   display: flex;
   justify-content: center;
   background-color: #f2f2f2;
`
export const ActionButton = styled(Button)`
   margin: 5px;
   background-color: ${(props: any) => props.color};
`
