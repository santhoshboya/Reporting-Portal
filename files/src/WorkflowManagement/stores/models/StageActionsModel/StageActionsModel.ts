import { action } from 'mobx'
import { StageActionsType } from '../../types'

import ActionModel from '../ActionModel'

class StageActionsModel {
   stageId
   actions
   stageDisplayName
   constructor(stageWithActionsObject: StageActionsType) {
      const { stage_id, actions, stage_display_name } = stageWithActionsObject
      this.stageId = stage_id
      this.stageDisplayName = stage_display_name
      this.actions = actions.map(action => new ActionModel(action))
   }

   @action.bound
   getStageActions(stageId) {
      return this.actions.find(action => action.stageId === stageId)
   }
}
export default StageActionsModel
