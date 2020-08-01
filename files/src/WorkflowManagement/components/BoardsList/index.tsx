import 'styled-components/macro'
import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { withTranslation, WithTranslation } from 'react-i18next'

import { APIStatus } from '@ib/api-constants'

import Loader from '../../../Common/components/Loader'

import BoardModel from '../../stores/models/BoardModel'

import BoardView from '../BoardView'

import i18n from '../../../Common/i18n'
import {
   LoaderWrapper,
   InfiniteScrollComponentWrapper,
   BoardsListWrapper,
   BoardsHeading
} from './styledComponents'

interface BoardsListProps extends WithTranslation {
   boardsList: Array<BoardModel>
   boardsListApiStatus?: APIStatus
   onClick: (id: string) => void
   boardsListClassName?: string
   boardClassName?: string
   boardsListCss?: React.CSSProperties
   boardCss?: React.CSSProperties
   height?: number
   selectedBoardId?: string
   fetchMoreBoards?: () => void
   hasMoreBoards?: boolean
   boardsCount?: number
   isCollapsed?: boolean
}

@observer
class BoardsList extends Component<BoardsListProps> {
   static defaultProps = {
      height: 220
   }

   renderLoader = () => (
      <LoaderWrapper>
         <Loader />
      </LoaderWrapper>
   )

   renderBoardView = () => {
      const {
         boardsList,
         boardCss,
         boardClassName,
         onClick,
         selectedBoardId,
         isCollapsed
      } = this.props

      return boardsList.map(board => (
         <BoardView
            key={board.id}
            board={board}
            boardCss={boardCss}
            onClick={onClick}
            boardClassName={boardClassName}
            selectedBoardId={selectedBoardId}
            isCollapsed={isCollapsed}
         />
      ))
   }

   render() {
      const {
         height,
         boardsListCss,
         boardsListClassName,
         fetchMoreBoards,
         hasMoreBoards,
         boardsCount,
         isCollapsed
      } = this.props

      return (
         <BoardsListWrapper data-testid={'scrollContainer'}>
            <BoardsHeading>
               {i18n.t('workflowManagement:boardsList.sidebar.allBoards')}
            </BoardsHeading>
            <InfiniteScrollComponentWrapper
               next={fetchMoreBoards}
               dataLength={boardsCount}
               hasMore={hasMoreBoards}
               css={boardsListCss}
               boardsListClassName={boardsListClassName}
               height={height}
               isCollapsed={isCollapsed}
               loader={this.renderLoader()}
            >
               {this.renderBoardView()}
            </InfiniteScrollComponentWrapper>
         </BoardsListWrapper>
      )
   }
}

export default withTranslation()(BoardsList)
