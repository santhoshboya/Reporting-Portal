import React, { Component } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { observable } from 'mobx'
import { observer } from 'mobx-react'

import CheckboxGroup from '.'

const options = [
   { label: 'Male', value: 'MALE' },
   { label: 'Female', value: 'FEMALE' },
   { label: 'Others', value: 'OTHERS' }
]

@observer
class CheckBoxGroupWithState extends Component {
   @observable checkedValues: string[] = []
   ref = React.createRef()
   getIndexOfValue = (value: string) => this.checkedValues.indexOf(value)

   getSelectedValues = () => this.checkedValues.slice()

   onSelectOption = (value: string) => {
      const index = this.getIndexOfValue(value)
      if (index === -1) {
         this.checkedValues.push(value)
      } else {
         this.checkedValues.splice(index, 1)
      }
   }

   render() {
      return (
         <div>
            <CheckboxGroup
               checkBoxGroupLabel={'Gender'}
               options={options}
               selectedValues={this.checkedValues}
               onChange={this.onSelectOption}
            />
            <button onClick={() => alert(this.checkedValues)}>
               get values
            </button>
         </div>
      )
   }
}

storiesOf('CheckboxGroup', module)
   .add('checkbox buttons', () => (
      <CheckboxGroup
         options={options}
         checkBoxGroupLabel={'Gender'}
         onChange={action('selected')}
      />
   ))
   .add('buttons enabled', () => (
      <CheckboxGroup
         checkBoxGroupLabel={'Gender'}
         options={options}
         selectedValues={['FEMALE']}
         onChange={action('selected')}
      />
   ))
   .add('selected buttons disabled', () => (
      <CheckboxGroup
         checkBoxGroupLabel={'Gender'}
         disabled={true}
         options={options}
         selectedValues={['MALE']}
         onChange={action('selected')}
      />
   ))
   .add('buttons disabled', () => (
      <CheckboxGroup
         checkBoxGroupLabel={'Gender'}
         disabled={true}
         options={options}
         onChange={action('selected')}
      />
   ))
   .add('checkbox buttons ith state', () => <CheckBoxGroupWithState />)
