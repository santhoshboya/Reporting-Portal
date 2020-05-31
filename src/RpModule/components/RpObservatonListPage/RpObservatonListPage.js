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

@observer
class RpObservatonListPage extends Component {
    render() {
        const { observationList, onClickObservation, totalPages, currentPage, goToNextPage, goToPreviousPage, handleClick, goToRandomPage, navigateTOPage, userType } = this.props
        const { title, reportedOn, assignedTo, severty, status, dueDate, messages, listofObservations, addNew, closed, all, acknowledgedbyRp, assignedToMe, myObservations, resolved } = strings.rpFeatures

        return (
            <DesktopLayoutMainPage userName={"Sai Ram"} rpFeatures={[assignedToMe, myObservations]} navigateTOPage={navigateTOPage} currentPage={myObservations} profilePic={'https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/4f00d506-2d1f-4bba-9084-f0666b4e3f2b@3x.png'}>
                <ObseravationsHeader>
                    <PageHeading>{listofObservations}</PageHeading>

                    <PrimaryLeftIconDefault
                        className={'Primary-Left-IconDefault'}
                        value={addNew}
                        handleClick={handleClick}
                        src={'https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/7930d80d-a88c-485e-b54b-4239b82c39f0.svg'} />
                </ObseravationsHeader>
                <ObseravationsListTable>
                    <TableHeader>
                        <ObservationListHeader headings={[title, reportedOn, assignedTo, severty, status, dueDate, messages]} />
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
                                    observationId={observation.observationId}
                                    src={
                                        'https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/867a98d4-d61b-45cf-89cc-0a50a9dddb38@3x.png'
                                    } />
                            })}
                    </TableBody>


                </ObseravationsListTable>

                <Pagination totalPages={totalPages} currentPage={currentPage} goToNextPage={goToNextPage} goToRandomPage={goToRandomPage} goToPreviousPage={goToPreviousPage} />

            </DesktopLayoutMainPage>
        )
    }
}
export { RpObservatonListPage }
