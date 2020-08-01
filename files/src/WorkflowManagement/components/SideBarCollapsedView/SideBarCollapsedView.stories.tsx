import React, { Component } from 'react'
import { storiesOf } from '@storybook/react'

import SideBarCollapsedView from '.'

storiesOf(
   'Collapsible Sidebar/BoardsList',
   module
).add('SideBarCollapsedView  Component', () => <SideBarCollapsedView />)
