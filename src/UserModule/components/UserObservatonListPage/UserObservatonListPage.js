import React, { Component } from 'react'
import './index.css'
import { DesktopLayoutMainPage } from '../../../common/components/DesktopLayoutMainPage'
import { PageHeader } from '../../../common/components/PageHeader'
import { PrimaryLeftIconDefault } from '../../../common/components/PrimaryLeftIconDefault'
import strings from '../../../common/i18n/strings.json'
import {
    ObseravationsHeader, PageHeading, ObseravationsListTable, TableHeader, TableBody, PageHeadingAndAddButonDiv
} from './styledComponent'
import { ObservationListHeader } from '../../../common/components/ObservationListHeader'
import { ObservationListItem } from '../../../common/components/ObservationListItem'
import { observer } from 'mobx-react'
import { Pagination } from '../../../common/components/Pagination'
import { DropDown } from '../../../common/components/DropDown'
import LoadingWrapperWithFailure from '../../../common/components/LoadingWrapperWithFailure'
@observer
class UserObservatonListPage extends Component {

    renderSuccessUi = () => {

        const { handleClick, observationList, onClickObservation, totalPages, currentPage,
            goToNextPage, goToPreviousPage, goToRandomPage, reportedOnSort, dueDateOnSort,
            filterObservationList, filterType, userType, reportedBy } = this.props

        const { title, reportedOn, assignedTo, severty, status, dueDate, messages, addNew,
            listofObservations, all, acknowledgedbyRp, resolved, closed, reported, actioninProgress
        } = strings.userFeatures;
        return (
            <React.Fragment>
                <ObseravationsHeader>
                    <PageHeadingAndAddButonDiv>
                        <PageHeading>{listofObservations}</PageHeading>
                        <PrimaryLeftIconDefault
                            className={'Primary-Left-IconDefault'}
                            value={addNew}
                            handleClick={handleClick}
                            src={'https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/7930d80d-a88c-485e-b54b-4239b82c39f0.svg'} />
                    </PageHeadingAndAddButonDiv>
                    <DropDown onSlectOption={filterObservationList} className={'filter-user-observation-list'} options={[all,
                        acknowledgedbyRp, resolved, closed, reported, actioninProgress]} value={filterType} userType={userType} />
                </ObseravationsHeader>
                <ObseravationsListTable>
                    <TableHeader>
                        <ObservationListHeader reportedOnSort={reportedOnSort} dueDateOnSort={dueDateOnSort}
                            headings={[title, reportedOn, assignedTo, severty, status, dueDate, messages]} />
                    </TableHeader>
                    <TableBody>
                        {observationList.length > 0 &&
                            observationList.map(observation => {
                                return <ObservationListItem key={Math.random()}
                                    onClickObservation={onClickObservation}
                                    title={observation.title}
                                    reportedOn={observation.reportedOn}
                                    severty={observation.severty}
                                    status={observation.status}
                                    dueDate={observation.dueDate}
                                    dueDateType={observation.dueDateType}
                                    pairedPerson={observation.assignedTo}
                                    messages={observation.messages}
                                    userType={userType}
                                    reportedBy={observation.reportedBy}
                                    assignedTo={observation.assignedTo}
                                    observationId={observation.observationId}
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
        const { getObservationListAPIStatus, getObservationListAPIError, onRetryClick } = this.props;
        return (
            <DesktopLayoutMainPage userName={"Santhu"} profilePic={'https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/5a060d96-2b5d-4c5d-8c81-cb89b5b8328a@3x.png'}>

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
export { UserObservatonListPage }



