import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { withTranslation } from 'react-i18next'

// TODO: Handle Image Implementation

import DiscussionsHeader from '../../components/DiscussionsHeader'

import NoDataView from '../../components/NoDataView'
import {
   TaskDiscussionsContainer,
   LeftPaneContainer,
   ContentCenterWrapper,
   RightPaneContainer,
   WelcomeText,
   NavigatingContainer,
   LinkText,
   Text
} from './styledComponents'

interface WithTranslationProps {
   t: any
   i18n: any
   tReady: boolean
}

interface TaskDiscussionsRouteProps extends WithTranslationProps {
   // TODO: optimize this es-lint error
   any: any
}

@observer
class TaskDiscussionsRoute extends Component<TaskDiscussionsRouteProps> {
   prefixForT = 'discussions.taskDiscussions.'

   componentDidMount() {
      // FIXME: get entity_id and entity_type from routh path match params
   }

   render() {
      const {
         props: { t },
         prefixForT
      } = this

      return (
         <TaskDiscussionsContainer>
            <DiscussionsHeader />
            <NoDataView />
         </TaskDiscussionsContainer>
      )
   }
}

export default withTranslation()(TaskDiscussionsRoute)
