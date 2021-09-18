import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import tw, { css } from 'twin.macro'

import columnsResponse from '../../fixtures/getColumnsResponse.json'
import ColumnsService from '../../services/ColumnsService/ColumnsFixture'
import TaskActionsApi from '../../services/TaskActionsService/TaskActionsFixture'
import ColumnsStore from '../../stores/ColumnsStore'

import ListView from '.'

const columnsStore = new ColumnsStore(
   new ColumnsService(),
   new TaskActionsApi()
)

const containerCSS = css`
   ${tw`mx-16px mt-32px`}
`

storiesOf('ListView', module).add('with all Props', () => (
   <ListView
      selectedBoardId={'baord-1'}
      columnsStore={columnsStore}
      onClickTask={action('clicked task')}
      containerCSS={containerCSS}
   />
))
