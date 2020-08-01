import React, { Component } from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import debounce from 'lodash/debounce'
import { withTranslation, WithTranslation } from 'react-i18next'

import { getSearchableDropDownStore } from '../../stores'
import SearchableDropDownComponent from './SearchableDropDownComponent'

interface APIsearchableDropDownProps extends WithTranslation {
   url: string
   onChange?: (
      value: string | number,
      selectedValue: string | number
   ) => void | undefined
   labelText?: string
   placeholder?: string
   otherProps?: any
}

@observer
class APIsearchableDropDown extends Component<APIsearchableDropDownProps> {
   searchableDropDownStore
   searchableRef: React.RefObject<any> = React.createRef()
   @observable searchedText = ''
   @observable selectedValue!: number

   constructor(props) {
      super(props)
      const { url } = this.props
      this.searchableDropDownStore = getSearchableDropDownStore(url)
   }

   componentDidMount() {
      const { getSearchResultsData } = this.searchableDropDownStore
      getSearchResultsData(' ')
   }

   handleOnChange = (value, selectedValue) => {
      this.selectedValue = selectedValue

      const { onChange } = this.props
      onChange && onChange(value, selectedValue)
   }

   handleOnChangeInput = debounce((searchedText: string) => {
      this.searchedText = searchedText
      const { getSearchResultsData } = this.searchableDropDownStore
      getSearchResultsData(searchedText)
   }, 500)

   getOptions = () => {
      const { searchResultsArray } = this.searchableDropDownStore

      const optionsArray = searchResultsArray.map(obj => ({
         value: obj.id,
         label: obj.displayName
      }))

      return optionsArray
   }

   handleValidation = () => {
      const { t } = this.props
      if (this.searchedText === '' && this.selectedValue === undefined) {
         return {
            shouldShowError: true,
            errorMessage: t(
               'common:apiSearchableDropDown.errorMessages.required'
            )
         }
      }
      if (this.selectedValue === undefined) {
         return {
            shouldShowError: true,
            errorMessage: t(
               'common:apiSearchableDropDown.errorMessages.shouldSelectFromDropDown'
            )
         }
      }
   }

   render() {
      const { handleOnChange, handleOnChangeInput, getOptions } = this

      const options = getOptions() ? getOptions() : []

      const { getSearchResultsResponseStatus } = this.searchableDropDownStore

      const { url, ...otherProps } = this.props

      return (
         <SearchableDropDownComponent
            ref={this.searchableRef}
            options={options}
            onChange={handleOnChange}
            onInputChange={handleOnChangeInput}
            apiStatus={getSearchResultsResponseStatus}
            validate={this.handleValidation}
            {...otherProps}
         />
      )
   }
}

export default withTranslation('translations', { withRef: true })(
   APIsearchableDropDown
)
