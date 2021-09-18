import React, { Component } from 'react'
import { observer } from 'mobx-react'

import BoardModel from '../../stores/models/BoardModel'

import BoardsList from '../BoardsList'

interface SideBarExpandedViewProps {
   boardsList: Array<BoardModel>
   boardsListApiStatus?: number
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
   onClickSideBarToggleButton?: () => void
   changeSelectedBoard?: (id: string) => void
   boardsApiStatus?: number
   boardListCss?: React.CSSProperties
   toggleSideBarView?: () => void
}
@observer
class SideBarExpandedView extends Component<SideBarExpandedViewProps> {
   render() {
      const {
         boardsList,
         onClick,
         selectedBoardId,
         boardsApiStatus,
         boardsCount,
         boardCss,
         boardListCss,
         fetchMoreBoards,
         hasMoreBoards,
         isCollapsed,
         toggleSideBarView
      } = this.props
      return (
         <BoardsList
            boardsList={boardsList}
            boardsListApiStatus={boardsApiStatus}
            onClick={onClick}
            boardCss={boardCss}
            boardsListCss={boardListCss}
            selectedBoardId={selectedBoardId}
            fetchMoreBoards={fetchMoreBoards}
            hasMoreBoards={hasMoreBoards}
            boardsCount={boardsCount}
            isCollapsed={isCollapsed}
         />
      )
   }
}

export default SideBarExpandedView
