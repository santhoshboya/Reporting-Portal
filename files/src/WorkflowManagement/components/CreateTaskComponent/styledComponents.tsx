import styled from '@emotion/styled'
import Button from '../../../Common/components/Button'

export const CreateRouteWrapper = styled.div`
   background-color: #f2f2f2;
`

export const TemplateSelector = styled.div`
   padding-top: 10px;
   background-color: #f2f2f2;
   justify-content: center;
   display: flex;
`
export const TaskTemplateWrapper = styled.div`
   width: 920px;
   padding-left: 20px;
`

export const TaskActions = styled.div`
   display: flex;
   justify-content: center;
   width: 100%;
   background-color: #f2f2f2;
`
export const TaskActionsFooter = styled.div`
   display: flex;
   justify-content: center;
   width: 100%;
   background-color: #f2f2f2;
   padding-bottom: 20px;
`
export const ActionsWrapper = styled.div`
   width: 920px;
   display: flex;
   padding-right: 20px;
   justify-content: flex-end;
`
export const ActionButton = styled(Button)`
   margin: 5px;
   background-color: ${(props: any) => props.color};
`

export const EmptyWrapper = styled.div`
   min-width: 800px;
`
