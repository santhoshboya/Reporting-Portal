import { UserOptionObject } from '../../types'

class UserOptionModel {
   id: string
   name: string
   constructor(userOption: UserOptionObject) {
      const { user_id, name } = userOption
      this.id = user_id
      this.name = name
   }
}

export default UserOptionModel
