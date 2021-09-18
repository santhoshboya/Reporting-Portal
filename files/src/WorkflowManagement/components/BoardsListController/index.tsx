import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { action, observable } from 'mobx'

import BoardsStore from '../../stores/BoardsStore'
import ColumnsStore from '../../stores/ColumnsStore'
import { getSelectedBoard } from '../../utils/BoardsUtils'
import { BOARDS_ROUTE_PATH } from '../../constants/NavigationConstants'

import BoardsList from '../BoardsList'

import { boardCss, boardListCss } from './styledComponents'

interface InjectedProps extends RouteComponentProps {
   boardsStore: BoardsStore
   columnsStore: ColumnsStore
}

@inject('boardsStore', 'columnsStore')
@observer
class BoardsListController extends Component<RouteComponentProps> {
   @observable hasMoreBoards: boolean
   @observable isCollapsed: boolean
   @observable selectedView!: string
   @observable isMounted!: boolean

   constructor(props) {
      super(props)
      this.isCollapsed = false
      this.hasMoreBoards = true
      this.isMounted = false
   }

   get injectedProps() {
      return this.props as InjectedProps
   }
   componentDidMount() {
      this.isMounted = true
      const { getBoards } = this.injectedProps.boardsStore
      getBoards(this.onSuccess)
   }

   @action
   onSuccess = () => {
      // FIXME: this is maintaining context after component will unmount
      if (this.isMounted) {
         const { boardsList } = this.injectedProps.boardsStore
         const boardId = boardsList[0].id
         const { location } = this.props
         const selectedBoard = getSelectedBoard(location, boardId)
         this.setSelectedBoard(selectedBoard)
         this.navigateToBoard(selectedBoard)
      }
   }

   setSelectedBoard = id => {
      const { setSelectedBoard } = this.injectedProps.columnsStore
      setSelectedBoard(id)
   }

   navigateToBoard(id) {
      const { history } = this.props
      history.push(`${BOARDS_ROUTE_PATH}?board=${id}`)
   }

   fetchMoreBoards = () => {
      const {
         boardsCount,
         totalBoardsCount,
         getBoards
      } = this.injectedProps.boardsStore
      if (boardsCount < totalBoardsCount) {
         getBoards()
         return null
      }
      this.hasMoreBoards = false
   }
   onClickBoard = (id: string): void => {
      const { getColumns } = this.injectedProps.columnsStore
      this.setSelectedBoard(id)
      this.navigateToBoard(id)
      getColumns()
   }
   componentWillUnmount() {
      this.isMounted = false
   }

   render() {
      const {
         boardsList,
         boardsApiStatus,
         boardsCount
      } = this.injectedProps.boardsStore
      const { selectedBoardId } = this.injectedProps.columnsStore

      return (
         <BoardsList
            boardsList={boardsList}
            boardsListApiStatus={boardsApiStatus}
            onClick={this.onClickBoard}
            boardCss={boardCss}
            boardsListCss={boardListCss}
            selectedBoardId={selectedBoardId}
            fetchMoreBoards={this.fetchMoreBoards}
            hasMoreBoards={this.hasMoreBoards}
            boardsCount={boardsCount}
            isCollapsed={this.isCollapsed}
         />
      )
   }
}
export default withRouter(BoardsListController)
