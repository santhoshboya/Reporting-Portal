import React from 'react'
import { Provider } from 'mobx-react'
import { storiesOf } from '@storybook/react'
import { I18nextProvider } from 'react-i18next'

import {
   API_FETCHING,
   API_INITIAL,
   API_SUCCESS,
   API_FAILED
} from '@ib/api-constants'

import FileUploaderStore from '../../stores/FileUploadStore'
import FileUploaderService from '../../services/FileUploadService/index.fixture'
import i18n from '../../i18n'
import BaseS3File from '../BaseS3File'
import ProgressBarComponent from '../ProgressBarComponent'
import Button from '../Button'
import { SampleUiWrapper, Image } from './styledComponents'
import FileUploadField from '.'

export default {
   title: 'FileUploadField'
}

const fileUploaderStore = new FileUploaderStore(new FileUploaderService())

storiesOf('FileUploadField ', module).add('FileUploadField Component', () => (
   <Provider fileUploadStore={fileUploaderStore}>
      <I18nextProvider i18n={i18n}>
         <FileUploadField
            fileAcceptType={['.pdf', '.png']}
            extraBucketPath=''
         />
      </I18nextProvider>
   </Provider>
))

const renderSuccessUI = (url, filename) => (
   <SampleUiWrapper>
      <Image src={url} alt={'iBHubs Logo'} />
   </SampleUiWrapper>
)

const renderInitialUI = () => {
   const { types, variants } = Button

   return (
      <SampleUiWrapper>
         <Button
            type={types.outline}
            variant={variants.primary}
            text={'UPLOAD FROM COMPUTER'}
         />
      </SampleUiWrapper>
   )
}

const renderFetchingStateUI = () => (
   <SampleUiWrapper>
      <ProgressBarComponent percentage={70} shouldShowProgessHint={true} />
   </SampleUiWrapper>
)

const renderFileUploadField = (url, apiStatus, filename) => {
   switch (apiStatus) {
      case API_FETCHING:
         return renderFetchingStateUI()
      case API_INITIAL:
         if (url || filename) {
            return renderSuccessUI(filename, url)
         }
         return renderInitialUI()

      case API_SUCCESS:
         return renderSuccessUI(filename, url)
      case API_FAILED:
         if (url) {
            return renderSuccessUI(filename, url)
         }
         return renderInitialUI()

      default:
         return renderInitialUI()
   }
}

export const FileUploaderUsecaseSample = () => (
   <Provider fileUploadStore={fileUploaderStore}>
      <BaseS3File
         renderFileSelector={(url = 'rger', status, filename = 'iBHubs.png') =>
            renderFileUploadField(url, status, filename)
         }
         enableEdit={true}
         extraBucketPath=''
      />
   </Provider>
)
