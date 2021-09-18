import React, { Component } from 'react'
//worst practise
import { observer } from 'mobx-react'

import { DesktopLayoutMainPage } from '../../../common/components/DesktopLayoutMainPage'
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
   PageHeadingAndAddButonDiv,
   FilterBar,
   FilterLefttSubPart
} from './styledComponent'
import { DropDown } from '../../../common/components/DropDown'
import { ADMIN } from '../../../common/constants/NameConstants'
import LoadingWrapperWithFailure from '../../../common/components/LoadingWrapperWithFailure'
import NoDataView from '../../../common/components/NoDataView'
import {UserObservatonListPageProps} from '../../../UserModule/components/UserObservatonListPage/UserObservatonListPage'
import {categoriesType} from '../../../UserModule/stores/UserStore/UserStore'
import { AdminObsevationModel } from "../../stores/Models/AdminObsevationModel"

interface ListOfObservationsProps {
   filterCategory:(value:string)=>void,
   filterSubCategory:(value:string)=>void,
   getSubCateogariesMultiple:Array<string>,
   statusFilterOfList:string,
   setStatusFilterOfList:(value:string)=>void,
   categotyFilterType:string,
   subCategotyFilterType:string,
   cateogaries:Array<categoriesType>,
   getSubCateogaries:()=>Array<string>,
   cateogariesList:Array<string>,
   observationList:Array<AdminObsevationModel>,
   adminObservationsListAPIStatus:number,
   adminObservationsListAPIError:string,
   onClickObservation:(id:number)=>void,
   totalPages:number,
   currentPage:number,
   goToNextPage:()=>void,
   goToPreviousPage:()=>void,
   goToRandomPage:(value:string)=>void,
   dueDateOnSort:()=>void,
   userType:string,
   onRetryClick:()=>void
}

@observer
class ListOfObservations extends Component <ListOfObservationsProps>{
   renderSuccessUi = () => {
      const {
         observationList,
         onClickObservation,
         totalPages,
         currentPage,
         userType,
         goToPreviousPage,
         goToNextPage,
         filterCategory,
         filterSubCategory,
         getSubCateogariesMultiple,
         statusFilterOfList,
         setStatusFilterOfList,
         goToRandomPage,
         categotyFilterType,
         subCategotyFilterType,
         cateogaries,
         dueDateOnSort,
         cateogariesList
      } = this.props
      const {
         title,
         assignedTo,
         severty,
         status,
         dueDate,
         messages,
         closed,
         all,
         acknowledgedbyRp,
         resolved,
         reported,
         reportedBy,
         totalObservations,
         actioninProgress
      } = strings.rpFeatures
      return (
         <React.Fragment>
            <ObseravationsHeader>
               <PageHeadingAndAddButonDiv>
                  <PageHeading>{totalObservations}</PageHeading>
               </PageHeadingAndAddButonDiv>
               <FilterBar>
                  <FilterLefttSubPart>
                     <DropDown
                        onSlectOption={filterCategory}
                        isMulti={true}
                        className={'filters'}
                        options={cateogaries.length > 0 ? cateogariesList : []}
                        value={categotyFilterType}
                        userType={userType}
                     />
                     <DropDown
                        onSlectOption={filterSubCategory}
                        isMulti={true}
                        className={'filters'}
                        options={getSubCateogariesMultiple}
                        value={subCategotyFilterType}
                        userType={userType}
                     />
                  </FilterLefttSubPart>
                  <DropDown
                     onSlectOption={setStatusFilterOfList}
                     className={'filters'}
                     options={[
                        all,
                        actioninProgress,
                        acknowledgedbyRp,
                        resolved,
                        closed,
                        reported
                     ]}
                     value={statusFilterOfList}
                     userType={userType}
                  />
               </FilterBar>
            </ObseravationsHeader>
            {observationList.length > 0 ? (
               <React.Fragment>
                  <ObseravationsListTable>
                     <TableHeader>
                        <ObservationListHeader
                           dueDateOnSort={dueDateOnSort}
                           headings={[
                              title,
                              reportedBy,
                              severty,
                              status,
                              assignedTo,
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
                                    reportedBy={observation.reportedBy}
                                    severty={observation.severty}
                                    status={observation.status}
                                    assignedTo={observation.assignedTo}
                                    dueDate={observation.dueDate}
                                    dueDateType={observation.dueDateType}
                                    pairedPerson={observation.assignedTo}
                                    messages={observation.messages}
                                    observationId={observation.observationId}
                                    reportedOn={""}
                                    userType={'Admin'}
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
         adminObservationsListAPIStatus,
         adminObservationsListAPIError,
         onRetryClick
      } = this.props
      const { totalObservations } = strings.rpFeatures
      return (
         <DesktopLayoutMainPage
            userName={'Santhu'}
            userType={ADMIN}
            currentPage={totalObservations}
            profilePic={
               'https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/4f00d506-2d1f-4bba-9084-f0666b4e3f2b@3x.png'
            }
         >
            <LoadingWrapperWithFailure
               apiStatus={adminObservationsListAPIStatus}
               apiError={adminObservationsListAPIError}
               renderSuccessUI={this.renderSuccessUi}
               onRetryClick={onRetryClick}
            />
         </DesktopLayoutMainPage>
      )
   }
}
export { ListOfObservations }
