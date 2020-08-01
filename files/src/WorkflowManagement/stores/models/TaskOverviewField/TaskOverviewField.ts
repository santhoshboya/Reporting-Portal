import uuid from 'react-uuid'

import { FieldOverviewModelType } from '../../types'

class TaskOverviewField {
   id: string
   fieldType: string
   name: string
   value: string
   constructor(fieldObj: FieldOverviewModelType) {
      const { field_type, key, value } = fieldObj
      this.fieldType = field_type
      this.name = key
      this.value = value
      this.id = uuid().toString()
   }
}
export default TaskOverviewField
