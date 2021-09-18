import React from 'react'
import { storiesOf } from '@storybook/react'
import SlimBar from '.'

storiesOf('SlimBar', module)
   .add('SlimBar View', () => (
      <SlimBar
         isSlimBarItemSelected={false}
         slimBarItemSelectedId={'boards'}
         sideBarView={<div>SideBar View</div>}
         slimBarHeaderView={<div>Header View</div>}
         slimBarFooterView={<div>Footer View</div>}
      />
   ))
   .add('SlimBar with SideBar View', () => (
      <SlimBar
         isSlimBarItemSelected={true}
         slimBarItemSelectedId={'boards'}
         sideBarView={<div>SideBar View</div>}
         slimBarHeaderView={<div>Header View</div>}
         slimBarFooterView={<div>Footer View</div>}
      />
   ))
