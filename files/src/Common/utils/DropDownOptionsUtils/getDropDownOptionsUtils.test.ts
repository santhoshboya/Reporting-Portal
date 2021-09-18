import { getDropDownOptionsUtils } from './index'
describe('Text Validation utils', () => {
   it('should test plainTextValidation TRUE', () => {
      const dropDownOptions = getDropDownOptionsUtils([
         { id: 'value', name: 'label' }
      ])
      expect(dropDownOptions).toStrictEqual([
         { value: 'value', label: 'label' }
      ])
   })
})
