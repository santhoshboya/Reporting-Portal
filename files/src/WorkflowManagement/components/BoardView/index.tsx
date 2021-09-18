import React, { Component } from 'react'

import BoardModel from '../../stores/models/BoardModel'

import { BoardWrapper, BoardTitle } from './styledComponents'

interface BoardViewProps {
   onClick: (id: string) => void
   boardClassName?: string
   boardCss?: React.CSSProperties
   selectedBoardId?: string
   isCollapsed?: boolean
   board: BoardModel
}

class BoardView extends Component<BoardViewProps> {
   getIsSelected = (id: string) => {
      const { selectedBoardId } = this.props
      if (selectedBoardId === id) return true
      return false
   }

   onClickBoard = () => {
      const {
         onClick,
         board: { id }
      } = this.props
      onClick(id)
   }

   render() {
      const { boardCss, boardClassName, onClick, board } = this.props
      const { id } = board

      return (
         <BoardWrapper
            data-testid={board.id}
            key={id}
            css={boardCss}
            onClick={this.onClickBoard}
            className={boardClassName}
            isSelected={this.getIsSelected(id)}
         >
            <BoardTitle isSelected={this.getIsSelected(id)}>
               {board.name}
            </BoardTitle>
         </BoardWrapper>
      )
   }
}

export default BoardView
