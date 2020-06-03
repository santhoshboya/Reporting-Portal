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
    ObseravationsHeader, PageHeading, ObseravationsListTable, TableHeader, TableBody, PageHeadingAndAddButonDiv, FilterBar
} from './styledComponent'
import { DropDown } from '../../../common/components/DropDown'
import getObservationsResponse from '../../fixtures/getObservationsResponse.json'
import { ADMIN } from '../../../common/constants/NameConstants'
import LoadingWrapperWithFailure from '../../../common/components/LoadingWrapperWithFailure'
@observer
class ListOfObservations extends Component {

    renderSuccessUi = () => {
        const { observationList, onClickObservation, totalPages, currentPage, handleClick, navigateTOPage, userType,
            goToPreviousPage, goToNextPage, filterCategory, filterSubCategory,
            goToRandomPage, categotyFilterType, subCategotyFilterType } = this.props
        const { title, reportedOn, assignedTo, severty, status, dueDate, messages, listofObservations, addNew,
            closed, all, acknowledgedbyRp, assignedToMe, myObservations, resolved, reported, reportedBy,
            categories, totalObservations } = strings.rpFeatures
        return (
            <React.Fragment>
                <ObseravationsHeader>
                    <PageHeadingAndAddButonDiv>
                        <PageHeading>{totalObservations}</PageHeading>
                    </PageHeadingAndAddButonDiv>
                    <FilterBar>
                        <DropDown onSlectOption={filterCategory} className={'filters'} options={[all,
                            acknowledgedbyRp, resolved, closed, reported]} value={categotyFilterType} userType={userType} />
                        <DropDown onSlectOption={filterSubCategory} className={'filters'} options={[all,
                            acknowledgedbyRp, resolved, closed, reported]} value={subCategotyFilterType} userType={userType} />
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
                                    userType={'admin'}
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
