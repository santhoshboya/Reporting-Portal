import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { withTranslation } from 'react-i18next'

import SearchIcon from '../../../../Common/icons/SearchIcon'

import {
   SearchBarContainer,
   SearchiconDiv,
   InputField
} from './styledComponent'

interface WithTranslationProps {
   t: any
   i18n: any
   tReady: boolean
}

interface SearchBarProps extends WithTranslationProps {
   onChangeSearchText: Function
   searchText: string
   onKeyDown: (e: any) => void
}

@observer
class SearchBar extends Component<SearchBarProps> {
   onChangeSearchText = event => {
      const { onChangeSearchText } = this.props
      onChangeSearchText(event.target.value)
   }

   render() {
      const { searchText, onKeyDown, t } = this.props
      return (
         <SearchBarContainer>
            <SearchiconDiv>
               <SearchIcon />
            </SearchiconDiv>
            <InputField
               as='input'
               value={searchText}
               placeholder={t('iam:users.searchBarPlaceHolder')}
               onChange={this.onChangeSearchText}
               onKeyDown={onKeyDown}
            />
         </SearchBarContainer>
      )
   }
}

export default withTranslation('translation', { withRef: false })(SearchBar)
