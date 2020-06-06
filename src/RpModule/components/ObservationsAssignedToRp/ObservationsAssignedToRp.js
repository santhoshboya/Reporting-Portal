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
    ObseravationsHeader, PageHeading, ObseravationsListTable, TableHeader, TableBody
} from './styledComponent'
import { DropDown } from '../../../common/components/DropDown'
import LoadingWrapperWithFailure from '../../../common/components/LoadingWrapperWithFailure'
import { RP } from '../../../common/constants/NameConstants'
import NoDataView from '../../../common/components/NoDataView'
import { ToastContainer } from 'react-toastify'
@observer
class ObservationsAssignedToRp extends Component {

    renderSuccessUi = () => {
        const { observationList, onClickObservation, totalPages, currentPage, assignedObservationsGoToNextPage,
            assignedObservationsGoToPreviousPage, assignedObservationsGoToRandomPage, navigateTOPage, userType,
            filterAssignedObservationList, filterTypeOfAssignedObservation, assignedObservationsDueDateOnSort,
            assignedObservationsReportedOnSort, assignedObservationAPIStatus,
            assignedObservationAPIError } = this.props

        const { title, reportedOn, reportedBy, severty, status, dueDate, messages, ObservationsAssignedTOMe,
            closed, all, acknowledgedbyRp, assignedToMe, myObservations, resolved, reported, actioninProgress } = strings.rpFeatures

        return (
            <React.Fragment>
                <ObseravationsHeader>
                    <PageHeading>{ObservationsAssignedTOMe}</PageHeading>

                    <DropDown onSlectOption={filterAssignedObservationList} className={'flter-Drop-Down'} options={[all,
                        acknowledgedbyRp, resolved, closed, reported, actioninProgress]} value={filterTypeOfAssignedObservation} userType={userType} />
                </ObseravationsHeader>
                {observationList.length > 0 ?
                    <React.Fragment>
                        <ObseravationsListTable>
                            <TableHeader>
                                <ObservationListHeader reportedOnSort={assignedObservationsReportedOnSort}
                                    dueDateOnSort={assignedObservationsDueDateOnSort}
                                    headings={[title, reportedOn, reportedBy, severty, status, dueDate, messages]} />
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
                                            pairedPerson={observation.reportedBy}
                                            messages={observation.messages}
                                            observationId={observation.observationId}
                                            reportedBy={observation.reportedBy}
                                            userType={userType}
                                            src={
                                                'https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/867a98d4-d61b-45cf-89cc-0a50a9dddb38@3x.png'
                                            } />
                                    })}
                            </TableBody>


                        </ObseravationsListTable>

                        <Pagination totalPages={totalPages} currentPage={currentPage} goToNextPage={assignedObservationsGoToNextPage}
                            goToRandomPage={assignedObservationsGoToRandomPage} goToPreviousPage={assignedObservationsGoToPreviousPage} />
                    </React.Fragment>
                    :
                    <NoDataView />}

            </React.Fragment>
        );


    }

    render() {
        const { assignedToMe, myObservations } = strings.rpFeatures;
        const { assignedObservationAPIStatus, assignedObservationAPIError, onRetryClick, navigateTOPage } = this.props;
        return (
            <DesktopLayoutMainPage userName={"Sai Ram"} userType={RP} navigateTOPage={navigateTOPage}
                currentPage={assignedToMe} profilePic={'https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/4f00d506-2d1f-4bba-9084-f0666b4e3f2b@3x.png'}>


                <LoadingWrapperWithFailure
                    apiStatus={assignedObservationAPIStatus}
                    apiError={assignedObservationAPIError}
                    renderSuccessUI={this.renderSuccessUi}
                    onRetryClick={onRetryClick}
                />

            </DesktopLayoutMainPage>
        )
    }
}
export { ObservationsAssignedToRp }
