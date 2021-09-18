export const getDropDownOptionsUtils = (optionsList: Array<OptionType>) =>
   optionsList.map(option => ({
      value: option.id,
      label: option.name
   }))
interface OptionType {
   id: string
   name: string
}
