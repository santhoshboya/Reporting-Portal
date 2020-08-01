import React, { Component } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import RadioButton from '.'
import './styles.css'
@observer
class RadioButtonWithState extends Component {
   @observable selectedValue = ''
   onSelectOption = (value: string) => {
      this.selectedValue = value
   }
   render() {
      return (
         <div>
            <RadioButton
               radioGroupLabel={'Gender'}
               options={[
                  { label: 'Male', value: 'Male' },
                  { label: 'Female', value: 'Female' },
                  { label: 'Others', value: 'Others' }
               ]}
               selectedValue={this.selectedValue}
               onSelectOption={this.onSelectOption}
            />
            <button onClick={() => alert(this.selectedValue)}>get value</button>
         </div>
      )
   }
}
storiesOf('RadioButton', module)
   .add('buttons enabled', () => (
      <RadioButton
         radioGroupLabel={'Gender'}
         options={[
            { label: 'Male', value: 'Male' },
            { label: 'Female', value: 'Female' },
            { label: 'Others', value: 'Others' }
         ]}
         onSelectOption={action('selected')}
      />
   ))
   .add('buttons enabled and selected', () => (
      <RadioButton
         radioGroupLabel={'Gender'}
         options={[
            { label: 'Male', value: 'Male' },
            { label: 'Female', value: 'Female' },
            { label: 'Others', value: 'Others' }
         ]}
         selectedValue={'Female'}
         onSelectOption={action('selected')}
      />
   ))
   .add('buttons disabled', () => (
      <RadioButton
         radioGroupLabel={'Gender'}
         disabled={true}
         options={[
            { label: 'Male', value: 'Male' },
            { label: 'Female', value: 'Female' },
            { label: 'Others', value: 'Others' }
         ]}
         onSelectOption={action('selected')}
      />
   ))
   .add('buttons disabled and selected', () => (
      <RadioButton
         radioGroupLabel={'Gender'}
         disabled={true}
         options={[
            { label: 'Male', value: 'Male' },
            { label: 'Female', value: 'Female' },
            { label: 'Others', value: 'Others' }
         ]}
         selectedValue={'Male'}
         onSelectOption={action('selected')}
      />
   ))
   .add('buttons with props styles', () => (
      <RadioButton
         radioGroupLabel={'Gender'}
         disabled={true}
         containerClassName={'radioItems-container-className'}
         options={[
            { label: 'Male', value: 'Male' },
            { label: 'Female', value: 'Female' },
            { label: 'Others', value: 'Others' }
         ]}
         selectedValue={'Male'}
         onSelectOption={action('selected')}
      />
   ))
   .add('buttons with state', () => <RadioButtonWithState />)
