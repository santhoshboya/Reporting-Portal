import 'styled-components/macro'
import React from 'react'
import { observer } from 'mobx-react'

import { fieldTypes } from '../../constants/ColumnConstants'
import TaskOverviewFieldModel from '../../stores/models/TaskOverviewField'

import { Text, Image, Title } from './styledComponents'

interface FieldProps {
   field: TaskOverviewFieldModel
}
@observer
class TaskOverviewField extends React.Component<FieldProps> {
   renderBasedOnType = () => {
      const { value, fieldType, name } = this.props.field

      switch (fieldType) {
         case fieldTypes.image:
            return <Image src={value} alt={name} />
         case fieldTypes.name:
            return <Title>{value}</Title>
         default:
            return <Text>{value}</Text>
      }
   }

   render() {
      return <>{this.renderBasedOnType()}</>
   }
}

export default TaskOverviewField
