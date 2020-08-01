import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { API_FETCHING, API_SUCCESS, API_FAILED } from '@ib/api-constants'
import { I18nextProvider } from 'react-i18next'

import i18n from '../../i18n'
import LoadingWrapper from '.'

function ChildComponent() {
   return <span>Render data here...</span>
}

function getCustomError(message: string): Error {
   return new Error(
      JSON.stringify({
         response: message,
         res_status: 'CUSTOM_ERROR',
         http_status_code: 400
      })
   )
}

storiesOf('component Guide', module).add(
   'LoadingWrapper Component when fetching',
   () => (
      <I18nextProvider i18n={i18n}>
         <LoadingWrapper
            onRetry={action('clicked retry button')}
            apiError={getCustomError('Connection failed')}
            apiStatus={API_FETCHING}
            renderSuccessView={() => ChildComponent()}
         />
      </I18nextProvider>
   )
)
