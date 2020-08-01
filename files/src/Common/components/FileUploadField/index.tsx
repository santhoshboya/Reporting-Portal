import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { observable, action } from 'mobx'
import { withTranslation, WithTranslation } from 'react-i18next'

import {
   API_INITIAL,
   API_FETCHING,
   API_SUCCESS,
   API_FAILED
} from '@ib/api-constants'

import BaseS3File, { Props } from '../BaseS3File'
import ProgressBarComponent from '../ProgressBarComponent'

import {
   UiWrapper,
   FileName,
   FailureViewWrapper,
   UploadFieldDescription,
   ProgressBarWrapper,
   RetryButton,
   DownloadButton,
   SuccessViewWrapper
} from './styledComponents'

interface FileUploadFieldProps extends Props, WithTranslation {
   fileAcceptType: Array<string>
   extraBucketPath: string
}

@observer
class FileUploadField extends Component<FileUploadFieldProps> {
   @observable successFileUrl!: string
   @observable percentage = 0

   fileUploadFieldRef

   constructor(props) {
      super(props)
      this.fileUploadFieldRef = React.createRef()
   }

   renderSuccessUi = filename => (
      <UiWrapper>
         <FileName>{filename}</FileName>
      </UiWrapper>
   )

   renderInitialUi = () => {
      const { t } = this.props
      return (
         <UiWrapper>
            <UploadFieldDescription>
               {t('common:fileUploaderField.uploadFromComputer')}
            </UploadFieldDescription>
         </UiWrapper>
      )
   }

   renderFetchingStateUi = () => {
      setInterval(() => {
         if (this.percentage === 95) {
            this.percentage += 0
         } else {
            this.percentage += 5
         }
      }, 500)

      return (
         <UiWrapper>
            <ProgressBarWrapper>
               <ProgressBarComponent
                  percentage={this.percentage}
                  shouldShowProgessHint={true}
               />
            </ProgressBarWrapper>
         </UiWrapper>
      )
   }

   @action.bound
   onRetry(event) {
      event.stopPropagation()
      this.percentage = 0
      this.fileUploadFieldRef.current.uploadFile()
   }

   renderFailedUI = filename => {
      const { t } = this.props
      return (
         <UiWrapper>
            <FailureViewWrapper>
               <FileName>{filename}</FileName>
               <RetryButton onClick={this.onRetry}>
                  {t('common:fileUploaderField.retry').toUpperCase()}
               </RetryButton>
            </FailureViewWrapper>
         </UiWrapper>
      )
   }

   getFileName = url => {
      const filename = url.split('/')
      return filename[filename.length - 1]
   }

   renderFileUploadField = (url, apiStatus, filename) => {
      switch (apiStatus) {
         case API_FETCHING:
            return this.renderFetchingStateUi()
         case API_INITIAL:
            if (url || filename) {
               return this.renderSuccessUi(this.getFileName(url))
            }
            return this.renderInitialUi()

         case API_SUCCESS:
            return this.renderSuccessUi(this.getFileName(url))
         case API_FAILED:
            return this.renderFailedUI(filename)

         default:
            return this.renderInitialUi()
      }
   }

   validation = () => {
      const { t } = this.props
      const sendingFileUrl = this.fileUploadFieldRef.current.url

      if (sendingFileUrl === undefined) {
         return {
            shouldShowError: true,
            errorMessage: t(
               'common:fileUploaderField.errorMessage.thisFieldIsMandatory'
            )
         }
      }
      return { shouldShowError: false, errorMessage: '' }
   }

   render() {
      const {
         fileAcceptType,
         extraBucketPath,
         onSuccessFileUpload
      } = this.props

      return (
         <BaseS3File
            renderFileSelector={this.renderFileUploadField}
            enableEdit={true}
            onSuccessFileUpload={onSuccessFileUpload}
            ref={this.fileUploadFieldRef}
            validate={this.validation}
            fileAcceptType={fileAcceptType}
            extraBucketPath={extraBucketPath}
         />
      )
   }
}

export default withTranslation('translation', { withRef: true })(
   FileUploadField
)
