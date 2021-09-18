import React, { Component } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { observer } from 'mobx-react'

import ColumnModel from '../../stores/models/ColumnModel'

import Column from './Column'

interface ColumnProps {
   column: ColumnModel
   shouldHighlight: boolean
   onClickTask: (id: string) => void
}
@observer
class ColumnWrapper extends Component<ColumnProps> {
   render() {
      const { props } = this
      return (
         <DndProvider backend={HTML5Backend}>
            <Column {...props} />
         </DndProvider>
      )
   }
}

export default ColumnWrapper
