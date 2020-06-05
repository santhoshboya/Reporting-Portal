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
    ObseravationsHeader, PageHeading, ObseravationsListTable, TableHeader, TableBody, PageHeadingAndAddButonDiv, FilterBar, FilterLefttSubPart
} from './styledComponent'
import { DropDown } from '../../../common/components/DropDown'
import getObservationsResponse from '../../fixtures/getObservationsResponse.json'
import { ADMIN } from '../../../common/constants/NameConstants'
import LoadingWrapperWithFailure from '../../../common/components/LoadingWrapperWithFailure'
@observer
class ListOfObservations extends Component {

    renderSuccessUi = () => {
        const { observationList, onClickObservation, totalPages, currentPage, handleClick, navigateTOPage, userType,
            goToPreviousPage, goToNextPage, filterCategory, filterSubCategory, getSubCateogariesMultiple, statusFilterOfList, setStatusFilterOfList,
            goToRandomPage, categotyFilterType, subCategotyFilterType, cateogaries, getSubCateogaries, cateogariesList } = this.props
        const { title, reportedOn, assignedTo, severty, status, dueDate, messages, listofObservations, addNew,
            closed, all, acknowledgedbyRp, assignedToMe, myObservations, resolved, reported, reportedBy,
            category, totalObservations, actioninProgress } = strings.rpFeatures
        return (
            <React.Fragment>
                <ObseravationsHeader>
                    <PageHeadingAndAddButonDiv>
                        <PageHeading>{totalObservations}</PageHeading>
                    </PageHeadingAndAddButonDiv>
                    <FilterBar>
                        <FilterLefttSubPart>
                            <DropDown onSlectOption={filterCategory} isMulti={true} className={'filters'}
                                options={cateogaries.length > 0 ? cateogariesList : []}
                                value={categotyFilterType} userType={userType} />
                            <DropDown onSlectOption={filterSubCategory} isMulti={true} className={'filters'} options={getSubCateogariesMultiple} value={subCategotyFilterType} userType={userType} />
                        </FilterLefttSubPart>
                        <DropDown onSlectOption={setStatusFilterOfList} className={'filters'} options={[all,
                            actioninProgress, acknowledgedbyRp, resolved, closed, reported]} value={statusFilterOfList} userType={userType} />
                    </FilterBar>
                </ObseravationsHeader>
                <ObseravationsListTable>
                    <TableHeader>
                        <ObservationListHeader headings={[title, reportedBy, severty, status, assignedTo, dueDate, messages]} />
                    </TableHeader>
                    <TableBody>
                        {observationList.length > 0 &&
                            observationList.map(observation => {
                                return <ObservationListItem key={Math.random()}
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
                                    userType={'Admin'}
                                    src={
                                        'https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/867a98d4-d61b-45cf-89cc-0a50a9dddb38@3x.png'
                                    } />
                            })}
                    </TableBody>


                </ObseravationsListTable>

                <Pagination totalPages={totalPages} currentPage={currentPage} goToNextPage={goToNextPage}
                    goToRandomPage={goToRandomPage} goToPreviousPage={goToPreviousPage} />
            </React.Fragment>
        );
    }
    render() {
        const { navigateTOPage, adminObservationsListAPIStatus, adminObservationsListAPIError, onRetryClick } = this.props
        const { totalObservations } = strings.rpFeatures
        return (
            <DesktopLayoutMainPage userName={"Santhu"} userType={ADMIN} navigateTOPage={navigateTOPage} currentPage={totalObservations} profilePic={'https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/4f00d506-2d1f-4bba-9084-f0666b4e3f2b@3x.png'}>
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
