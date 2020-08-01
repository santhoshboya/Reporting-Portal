export const getValuesWithLabels = (values: Array<string>) => {
   const valuesWithLabels: Array<any> = []
   values.forEach(value =>
      valuesWithLabels.push({
         label: value,
         value: value
      })
   )
   return valuesWithLabels
}
