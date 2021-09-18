export interface FieldRequest {
   field_id: string
   field_type: string
   field_response_single_value?: string
   field_response_multiple_values: Array<string>
}
export interface GOFRequest {
   gof_id: string
   gof_fields: Array<FieldRequest>
}
export interface CreateTaskRequest {
   task_gofs: Array<GOFRequest>
}
export interface UpdateTaskRequestObject {
   task_gofs: Array<GOFRequest>
}
export interface FieldType {
   field_id: string
   display_name: string
   is_field_required: boolean
   field_type: string
   field_values: string
   allowed_formats_regex: string
   validation: string
   error_msg: string
   tooltip: string
   placeholder_text: string
   is_field_readable: boolean
   is_field_writable: boolean
}

export interface GOFType {
   gof_id: string
   gof_display_name: string
   max_columns: number
   order: number
   enable_add_another: boolean
   fields: Array<FieldType>
}

export interface ActionType {
   action_id: string
   button_text: string
   button_color: string
}

export interface TaskTemplateType {
   template_id: string
   template_name: string
   actions: Array<ActionType>
   group_of_fields: Array<GOFType>
}

export interface TaskTemplateResponse {
   task_templates: Array<TaskTemplateType>
}

export interface TaskGofFieldType {
   field_id: string
   field_response: string
}

export interface TaskGofType {
   gof_id: string
   same_gof_order: number
   gof_fields: Array<TaskGofFieldType>
}

export interface StageActionsType {
   stage_id: string
   actions: Array<ActionType>
   stage_display_name: string
}
export interface TaskResponse {
   task_id: string
   stages_with_actions: Array<StageActionsType>
   template_id: string
   gofs: Array<TaskGofType>
}
export interface BoardType {
   board_id: string
   name: string
}
export interface BoardsApiResponse {
   total_boards_count: number
   boards_details: Array<BoardType>
}

export interface BoardsApiRequest {
   limit: number
   offset: number
}

export interface ActionModelType {
   action_id: string
   name: string
   button_text: string
   button_color: string | null
}

export interface FieldOverviewModelType {
   field_type: string
   key: string
   value: string
}

export interface TaskOverviewType {
   task_id: string
   fields: Array<FieldOverviewModelType>
   actions: Array<ActionModelType>
}

export interface ColumnType {
   column_id: string
   name: string
   tasks: Array<TaskOverviewType>
   total_tasks_count: number
}

export interface GetTasksOverviewApiResponse {
   total_tasks_count: number
   tasks: Array<TaskOverviewType>
}

export interface GetColumnsApiResponse {
   columns: Array<ColumnType>
   total_columns_count: number
}

export interface GetTasksOverviewParameters {
   limit: number
   offset: number
   columnId: string
}

export type getTasksOverviewType = (
   parameters: GetTasksOverviewParameters
) => Promise<GetTasksOverviewApiResponse>

interface StageActionType {
   stage_id: string
   stage_actions: Array<ActionModelType>
   fields: Array<FieldOverviewModelType>
}
interface CurrentBoardDetails {
   board_id: string
   board_name: string
   column_details: Array<Column>
}

interface Column {
   column_id: string
   column_name: string
   actions: Array<ActionModelType>
   fields: Array<FieldOverviewModelType>
}

interface BasicColumn {
   column_id: string
   column_name: string
}
interface SelectedTaskBoardType {
   board_id: string
   board_name: string
   column_details: Array<BasicColumn>
}
export interface TaskActionApiResponse {
   task_id: string
   other_board_details: Array<SelectedTaskBoardType>
   current_board_details: CurrentBoardDetails
}
export interface TaskActionApiRequest {
   task_id: string
   action_id: string
   board_id: string
}

interface TaskOverViewFiledsType {
   field_type: string
   field_display_name: string
   field_response: string
}

interface ActionsType {
   action_id: string
   button_text: string
   button_color: string
}

interface StageWithActionsType {
   stage_id: string
   stage_display_name: string
   actions: Array<ActionsType>
}

export interface HomeScreenTasksResponseType {
   tasks: Array<{
      task_id: string
      task_overview_fields: Array<TaskOverViewFiledsType>
      stage_with_actions: StageWithActionsType
   }>
   total_tasks: number
}

export interface HomeScreenTasksRequestType {
   limit: number
   offset: number
}
export interface WithTranslationProps {
   t: any
   i18n: any
   tReady: boolean
}
