import React, { Component } from 'react'
import { observer } from 'mobx-react'

import { DesktopLayoutMainPage } from '../../../common/components/DesktopLayoutMainPage'
import { PrimaryLeftIconDefault } from '../../../common/components/PrimaryLeftIconDefault'
import strings from '../../../common/i18n/strings.json'
import { ObservationListHeader } from '../../../common/components/ObservationListHeader'
import { ObservationListItem } from '../../../common/components/ObservationListItem'
import { Pagination } from '../../../common/components/Pagination'

import './index.css'
import {
   ObseravationsHeader,
   PageHeading,
   ObseravationsListTable,
   TableHeader,
   TableBody,
   PageHeadingAndAddButonDiv
} from './styledComponent'
import { DropDown } from '../../../common/components/DropDown'
import LoadingWrapperWithFailure from '../../../common/components/LoadingWrapperWithFailure'
import { USER } from '../../../common/constants/NameConstants'
import NoDataView from '../../../common/components/NoDataView'

import {UserObservatonListPageProps} from '../../../UserModule/components/UserObservatonListPage/UserObservatonListPage'

interface RpObservatonListPageProps extends UserObservatonListPageProps{
   navigateTOPage:(page:string)=>void
}

@observer
class RpObservatonListPage extends Component <RpObservatonListPageProps>{
   renderSuccessUi = () => {
      const {
         observationList,
         onClickObservation,
         totalPages,
         currentPage,
         handleClick,
         userType,
         goToPreviousPage,
         goToNextPage,
         filterObservationList,
         goToRandomPage,
         filterType,
         reportedOnSort,
         dueDateOnSort
      } = this.props
      const {
         title,
         reportedOn,
         assignedTo,
         severty,
         status,
         dueDate,
         messages,
         listofObservations,
         addNew,
         closed,
         all,
         acknowledgedbyRp,
         assignedToMe,
         myObservations,
         resolved,
         reported,
         actioninProgress
      } = strings.rpFeatures

      return (
         <React.Fragment>
            <ObseravationsHeader>
               <PageHeadingAndAddButonDiv>
                  <PageHeading>{listofObservations}</PageHeading>

                  <PrimaryLeftIconDefault
                     className={'Primary-Left-IconDefault'}
                     value={addNew}
                     handleClick={handleClick}
                     src={
                        'https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/7930d80d-a88c-485e-b54b-4239b82c39f0.svg'
                     }
                  />
               </PageHeadingAndAddButonDiv>
               <DropDown
                  onSlectOption={filterObservationList}
                  className={'flter-Drop-Down'}
                  options={[
                     all,
                     acknowledgedbyRp,
                     resolved,
                     closed,
                     reported,
                     actioninProgress
                  ]}
                  value={filterType}
                  userType={userType}
               />
            </ObseravationsHeader>
            {observationList.length > 0 ? (
               <React.Fragment>
                  <ObseravationsListTable>
                     <TableHeader>
                        <ObservationListHeader
                           dueDateOnSort={dueDateOnSort}
                           reportedOnSort={reportedOnSort}
                           headings={[
                              title,
                              reportedOn,
                              assignedTo,
                              severty,
                              status,
                              dueDate,
                              messages
                           ]}
                        />
                     </TableHeader>
                     <TableBody>
                        {observationList.length > 0 &&
                           observationList.map(observation => {
                              return (
                                 <ObservationListItem
                                    key={Math.random()}
                                    onClickObservation={onClickObservation}
                                    title={observation.title}
                                    reportedOn={observation.reportedOn}
                                    severty={observation.severty}
                                    status={observation.status}
                                    dueDate={observation.dueDate}
                                    dueDateType={observation.dueDateType}
                                    pairedPerson={observation.assignedTo}
                                    messages={observation.messages}
                                    observationId={observation.observationId}
                                    userType={userType}
                                    assignedTo={observation.assignedTo}
                                    reportedBy={''}
                                    src={
                                       'https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/867a98d4-d61b-45cf-89cc-0a50a9dddb38@3x.png'
                                    }
                                 />
                              )
                           })}
                     </TableBody>
                  </ObseravationsListTable>

                  <Pagination
                     totalPages={totalPages}
                     currentPage={currentPage}
                     goToNextPage={goToNextPage}
                     goToRandomPage={goToRandomPage}
                     goToPreviousPage={goToPreviousPage}
                  />
               </React.Fragment>
            ) : (
               <NoDataView />
            )}
         </React.Fragment>
      )
   }

   render() {
      const {
         navigateTOPage,
         getObservationListAPIStatus,
         getObservationListAPIError,
         onRetryClick
      } = this.props
      const { assignedToMe, myObservations } = strings.rpFeatures

      return (
         <DesktopLayoutMainPage
            userName={'Sai Ram'}
            userType={USER}
            navigateTOPage={navigateTOPage}
            currentPage={myObservations}
            profilePic={
               'https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/4f00d506-2d1f-4bba-9084-f0666b4e3f2b@3x.png'
            }
         >
            <LoadingWrapperWithFailure
               apiStatus={getObservationListAPIStatus}
               apiError={getObservationListAPIError}
               renderSuccessUI={this.renderSuccessUi}
               onRetryClick={onRetryClick}
            />
         </DesktopLayoutMainPage>
      )
   }
}
export { RpObservatonListPage }
