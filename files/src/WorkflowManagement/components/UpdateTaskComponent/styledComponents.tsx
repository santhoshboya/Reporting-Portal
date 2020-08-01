import styled from '@emotion/styled'
import Button from '../../../Common/components/Button'

export const StageSelector = styled.div`
   width: 920px;
   padding-left: 20px;
   margin-top: 5px;
`

export const StageActions = styled.div`
   width: 920px;
   display: flex;
   justify-content: flex-end;
   padding-right: 20px;
`

export const UiWrapper = styled.div`
   display: flex;
   justify-content: center;
   background-color: #f2f2f2;
`

export const StageActionsWrapper = styled.div`
   display: flex;
   justify-content: center;
   background-color: #f2f2f2;
   padding: 20px;
`
export const ActionButton = styled(Button)`
   margin: 5px;
   background-color: ${(props: any) => props.color};
`
export const EmptyWrapper = styled.div`
   width: 800px;
`
