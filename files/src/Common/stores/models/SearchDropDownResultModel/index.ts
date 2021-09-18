import { observable } from 'mobx'

class SearchDropDownResultModel {
   @observable id: number
   @observable displayName: string

   constructor(obj) {
      this.id = obj.id
      this.displayName = obj.display_name
   }
}

export default SearchDropDownResultModel
