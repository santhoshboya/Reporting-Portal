import React, { Component } from 'react'
import { observer } from 'mobx-react'

import {
   APIStatus,
   API_FETCHING,
   API_SUCCESS,
   API_FAILED
} from '@ib/api-constants'

import { getFormattedAPIErrorDescription } from '../../utils/APIErrorUtils'

import LoadingView from './LoadingView'
import FailureView from './FailureView'
import { Container } from './styledComponents'

interface Props {
   renderLoadingView: () => JSX.Element
   renderFailureView: (onRetry: () => void, failureText: string) => JSX.Element
   apiStatus: APIStatus

   onRetry: () => void
   apiError: Error | null
   containerStyle: Record<string, any>
   containerClassName: string
   renderSuccessView: React.ComponentType
}

@observer
class LoadingWrapper extends Component<Props> {
   static defaultProps = {
      onRetry: () => 0,
      renderLoadingView: () => (
         <div data-testid='loader'>
            <LoadingView />
         </div>
      ),
      renderFailureView: (onRetry, failureText) => (
         <FailureView onRetry={onRetry} failureText={failureText} />
      ),
      containerClassName: '',
      containerStyle: {}
   }

   renderChildrenWithContainer = (children: any) => {
      const { containerClassName, containerStyle } = this.props

      return (
         <Container style={containerStyle} className={containerClassName}>
            {children}
         </Container>
      )
   }

   renderContent = () => {
      const {
         renderFailureView,
         renderLoadingView,
         apiStatus,
         apiError,
         onRetry,
         renderSuccessView: RenderSuccessView
      } = this.props

      const failureText = getFormattedAPIErrorDescription(apiError)
      switch (apiStatus) {
         case API_FETCHING:
            return this.renderChildrenWithContainer(renderLoadingView())
         case API_SUCCESS:
            return <RenderSuccessView />
         case API_FAILED:
            return this.renderChildrenWithContainer(
               renderFailureView(onRetry, failureText)
            )
         default:
            return this.renderChildrenWithContainer(renderLoadingView())
      }
   }

   render() {
      return <>{this.renderContent()}</>
   }
}

export default LoadingWrapper
