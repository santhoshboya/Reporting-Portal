import React from 'react'
import { storiesOf } from '@storybook/react'
import styled from 'styled-components'
import tw from 'twin.macro'

import getBoardsListFixture from '../../fixtures/getBoardsApiResponse.json'
import BoardModel from '../../stores/models/BoardModel'

import LayoutWithSideBar from '.'

const MainSection = styled.div`
   ${tw`
      flex
   `}
`

const MainSectionContentContainer = styled.pre`
   ${tw`
      m-0 p-0
   `}
`

const boardsList = getBoardsListFixture.boards_details
   .slice(0, 7)
   .map(board => new BoardModel(board))

storiesOf('Collapsible Sidebar/BoardsList', module)
   .add('LayoutWithSideBar Component Vertical Scroll', () => (
      <LayoutWithSideBar sideBarView={<div>slimbar</div>}>
         <MainSection>
            <MainSectionContentContainer>
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
            </MainSectionContentContainer>
         </MainSection>
      </LayoutWithSideBar>
   ))
   .add('LayoutWithSideBar Component Horizontal Scroll', () => (
      <LayoutWithSideBar sideBarView={<div>slimbar</div>}>
         <MainSection>
            <MainSectionContentContainer>
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
            </MainSectionContentContainer>
         </MainSection>
      </LayoutWithSideBar>
   ))
