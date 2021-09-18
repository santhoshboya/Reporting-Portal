import { observable, reaction } from 'mobx'
import React, { Component } from 'react'
import { observer } from 'mobx-react'

import { APIStatus } from '@ib/api-constants'
import LoadingWrapper from '../../../Common/components/LoadingWrapper'

import ColumnModel from '../../stores/models/ColumnModel'
import { ANIMATION_TIME_MS } from '../../constants/ColumnConstants'

import Column from '../Column'

import {
   ColumnsContainer,
   NoDataContainer,
   loadingWrapperStyles
} from './styledComponents'

interface ColumnsProps {
   highlightedColumnsList: Array<string>
   columns: Array<ColumnModel>
   onColumnsMount: () => void
   getColumnsAPIStatus: APIStatus
   getColumnsAPIError: Error | null
   selectedBoardId: string
   onClickTask: (id: string) => void
}

@observer
class Columns extends Component<ColumnsProps> {
   @observable shouldHighlightColumns!: boolean

   constructor(props) {
      super(props)
      this.init()
   }

   componentDidMount() {
      const { onColumnsMount } = this.props
      onColumnsMount()
   }

   componentWillUnmount() {
      this.hightLightColumnsReaction()
   }

   init = () => {
      this.shouldHighlightColumns = false
   }

   isTaskAddedToColumn = (columnId: string): boolean => {
      const { highlightedColumnsList } = this.props
      return highlightedColumnsList.some(id => id === columnId)
   }

   hightLightColumnsReaction = reaction(
      () => {
         const { highlightedColumnsList } = this.props
         return highlightedColumnsList
      },
      columns => {
         this.shouldHighlightColumns = true
         setTimeout(() => {
            this.shouldHighlightColumns = false
         }, ANIMATION_TIME_MS)
      }
   )

   renderNoDataView = (): JSX.Element => (
      <NoDataContainer>{'No data Found.'}</NoDataContainer>
   )

   renderColumns = observer(
      (): JSX.Element => {
         const { columns, onClickTask } = this.props

         if (columns.length)
            return (
               <>
                  {columns.map(column => (
                     <Column
                        onClickTask={onClickTask}
                        key={column.id}
                        column={column}
                        shouldHighlight={
                           this.shouldHighlightColumns &&
                           this.isTaskAddedToColumn(column.id)
                        }
                     />
                  ))}
               </>
            )
         return this.renderNoDataView()
      }
   )

   render() {
      const { getColumnsAPIStatus, getColumnsAPIError } = this.props
      return (
         <ColumnsContainer>
            <LoadingWrapper
               apiStatus={getColumnsAPIStatus}
               apiError={getColumnsAPIError}
               renderSuccessView={this.renderColumns}
               containerStyle={loadingWrapperStyles}
            />
         </ColumnsContainer>
      )
   }
}

export default Columns
