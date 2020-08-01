import FieldModel from '../../stores/models/FieldTemplateModel'
import GofFieldModel from '../../stores/models/GofFieldModel'
export interface TextInputProps {
   label: string
   placeholder: string
   value: string
   validate?: any
   disabled: boolean
   onChange: (value: string) => void
}

export interface GofFieldType {
   fieldTemplate: FieldModel
   fieldData: GofFieldModel
}
export interface FieldProps {
   fieldTemplate: FieldModel
   fieldData: any
}
export interface DropDownOption {
   value: string
   label: string
}
