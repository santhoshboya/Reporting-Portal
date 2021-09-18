import React from 'react'

import { TextFontS1SubtitleBasic1000 } from '../../../Common/styleGuide/Typos'
import LoginIcon from '../../../Common/icons/LogInIcon'
import MenuIcon from '../../../Common/icons/MenuIcon'

import SummaryView from '../SummaryView'
import {
   ColumnDetails,
   Header,
   TaskCount,
   Container,
   Actions,
   LoginIconContainer
} from './styledComponents'

interface ColumnHeaderProps {
   name: string
   totalTaskCount: number
   amount?: string
}

function ColumnHeader(props: ColumnHeaderProps) {
   const { name, totalTaskCount } = props
   return (
      <ColumnDetails>
         <Header>
            <Container>
               <TextFontS1SubtitleBasic1000>{name}</TextFontS1SubtitleBasic1000>
               <TaskCount>{totalTaskCount}</TaskCount>
            </Container>
            <Actions>
               <LoginIconContainer>
                  <LoginIcon />
               </LoginIconContainer>
               <MenuIcon />
            </Actions>
         </Header>
         <SummaryView isKanbanView={true} />
      </ColumnDetails>
   )
}
export default ColumnHeader

ColumnHeader.defaultProps = {
   amount: 'Rs 10000'
}
