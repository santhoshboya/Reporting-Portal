import React from 'react'

import { addParameters } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs, text, select, boolean } from '@storybook/addon-knobs'

import { API_FETCHING } from '@ib/api-constants'
import { FlexRowContainer } from './styledComponents'
import CommonButton from '.'

const { variants, shapes, types, sizes } = CommonButton
function ChildComponent() {
   return <span>Text in ChildComponent</span>
}

const startEnhancer = () => 'PrefixEnhancer '
const endEnhancer = () => ' SuffixEnhancer'

const instruction =
   'Go through this Component Guide to get to know about ths Button Component'
addParameters({ notes: instruction })

export default {
   component: CommonButton,
   title: 'Button',
   decorators: [withKnobs]
}

export const DefaultButton = () => (
   <CommonButton onClick={action('clicked CommonButton')} text='Click Me' />
)

export const VariousButtonStyles = () => (
   <div>
      <div>
         <h2>Types</h2>
         <FlexRowContainer>
            <CommonButton
               onClick={action('clicked CommonButton')}
               text='Normal Button'
            />
            <CommonButton type={types.filled} text={types.filled} />
            <CommonButton type={types.outline} text={types.outline} />
            <CommonButton disabled text='Disabled' />
            <CommonButton
               startEnhancer={startEnhancer}
               endEnhancer={endEnhancer}
            >
               (Child or Text)
            </CommonButton>
         </FlexRowContainer>
      </div>
      <div>
         <FlexRowContainer>
            <h2>Loaders by props</h2>
            <h3>apiStatus & isLoading</h3>
         </FlexRowContainer>
         <FlexRowContainer>
            <CommonButton
               apiStatus={API_FETCHING}
               onClick={action('clicked CommonButton')}
            />
            <CommonButton isLoading onClick={action('clicked CommonButton')} />
         </FlexRowContainer>
      </div>
      <div>
         <h2>Filled Variants</h2>
         <FlexRowContainer>
            <CommonButton variant={variants.basic} text={variants.basic} />
            <CommonButton variant={variants.control} text={variants.control} />
            <CommonButton variant={variants.danger} text={variants.danger} />
            <CommonButton variant={variants.info} text={variants.info} />
            <CommonButton variant={variants.primary} text={variants.primary} />
            <CommonButton variant={variants.success} text={variants.success} />
            <CommonButton variant={variants.warning} text={variants.warning} />
         </FlexRowContainer>
      </div>
      <div>
         <h2>Outline Variants</h2>
         <FlexRowContainer>
            <CommonButton
               type={types.outline}
               variant={variants.basic}
               text={variants.basic}
            />
            <CommonButton
               type={types.outline}
               variant={variants.control}
               text={variants.control}
            />
            <CommonButton
               type={types.outline}
               variant={variants.danger}
               text={variants.danger}
            />
            <CommonButton
               type={types.outline}
               variant={variants.info}
               text={variants.info}
            />
            <CommonButton
               type={types.outline}
               variant={variants.primary}
               text={variants.primary}
            />
            <CommonButton
               type={types.outline}
               variant={variants.success}
               text={variants.success}
            />
            <CommonButton
               type={types.outline}
               variant={variants.warning}
               text={variants.warning}
            />
         </FlexRowContainer>
      </div>
      <div>
         <h2>Shapes</h2>
         <FlexRowContainer>
            <CommonButton
               shape={shapes.rectangular}
               text={shapes.rectangular}
            />
            <CommonButton shape={shapes.pill} text={shapes.pill} />
            <CommonButton shape={shapes.round} text={shapes.round} />
         </FlexRowContainer>
      </div>
      <div>
         <h2>Sizes</h2>
         <FlexRowContainer>
            <CommonButton size={sizes.tiny} text={sizes.tiny} />
            <CommonButton size={sizes.small} text={sizes.small} />
            <CommonButton size={sizes.medium} text={sizes.medium} />
            <CommonButton size={sizes.large} text={sizes.large} />
         </FlexRowContainer>
      </div>
   </div>
)

export const VisualPropKnobsButton = () => (
   <CommonButton
      onClick={action('clicked CommonButton')}
      variant={select('Variants', variants, variants.basic)}
      shape={select('Shapes', shapes, shapes.rectangular)}
      size={select('Sizes', sizes, sizes.medium)}
      type={select('Types', types, types.filled)}
      width={text('Width', '')}
      height={text('Height', '')}
   />
)
export const ModifiablePropKnobsButton = () => (
   <CommonButton
      onClick={action('clicked CommonButton')}
      disabled={boolean('Disable', false)}
      apiStatus={select('APIStatus-Loading', [0, 100], 0)}
      text={text('CustomText', 'Click Here')}
   />
)
export const ButtonWithChildrenComponent = () => (
   <CommonButton>
      <ChildComponent />
   </CommonButton>
)
