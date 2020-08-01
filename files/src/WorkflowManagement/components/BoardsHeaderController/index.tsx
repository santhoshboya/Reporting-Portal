import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import BoardsStore from '../../stores/BoardsStore'
import ColumnsStore from '../../stores/ColumnsStore'
import { getDropDownOptionsUtils } from '../../../Common/utils/DropDownOptionsUtils'
import BoardsHeader from '../BoardsHeader'
import { BOARDS_ROUTE_PATH } from '../../constants/NavigationConstants'

interface InjectedProps extends BoardsHeaderController {
   boardsStore: BoardsStore
   columnsStore: ColumnsStore
}

interface BoardsHeaderController extends RouteComponentProps {
   shouldShowBoardsDropDown: boolean
}

@inject('boardsStore', 'columnsStore')
@observer
class BoardsHeaderController extends Component<any> {
   //FIXME: BoardContoller props type
   get injectedProps() {
      return this.props as InjectedProps
   }
   renderBoardsDropDownOptions = () => {
      const { boardsList } = this.injectedProps.boardsStore
      return getDropDownOptionsUtils(boardsList)
   }

   renderSelectedBoardOption = () => {
      const { selectedBoardId } = this.injectedProps.columnsStore
      return this.renderBoardsDropDownOptions().find(
         option => option.value === selectedBoardId
      )
   }
   onClickBoard = (id: string): void => {
      const { getColumns } = this.injectedProps.columnsStore
      this.setSelectedBoard(id)
      this.navigateToBoard(id)
      getColumns()
   }
   setSelectedBoard = id => {
      const { setSelectedBoard } = this.injectedProps.columnsStore
      setSelectedBoard(id)
   }

   navigateToBoard(id) {
      const { history } = this.props
      history.push(`${BOARDS_ROUTE_PATH}?board=${id}`)
   }
   render() {
      const { shouldShowBoardsDropDown } = this.props
      return (
         <BoardsHeader
            projectName={'FinMan'}
            shouldShowBoardsDropDown={shouldShowBoardsDropDown}
            selectedBoard={this.renderSelectedBoardOption()}
            setSelectedBoard={this.onClickBoard}
            boardList={this.renderBoardsDropDownOptions()}
         />
      )
   }
}

export default withRouter(BoardsHeaderController)
