import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { withRouter } from 'react-router-dom';
import {
    RP_OBSERVATION_PATH, RP_OBSERVATION_SCREEN_PATH, RP_OBSERVATION_LIST_PATH
} from '../../constants/RouteConstants'
import { ObservationsAssignedToRp } from '../../components/ObservationsAssignedToRp';


@inject("rpStore")
@observer
class ObservationsAssignedToRpRoute extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        this.doNetworkCalls();
    }

    getRpStore = () => {
        return this.props.rpStore;
    }

    doNetworkCalls = () => {
        this.getRpStore().getAssignedObservationList();
    }
    onClickAddNew = () => {
        const { history } = this.props
        history.push(RP_OBSERVATION_PATH)
    }
    onSuccess = () => {
        alert("data recieved")
    }
    onFailure = () => {
        alert("data recieved")
    }
    navigateTOPage = (page) => {
        const { history } = this.props
        history.push(RP_OBSERVATION_LIST_PATH)
    }
    onClickObservation = (observationId) => {
        this.getRpStore().userStore.getObservation({}, this.onSuccess, this.onFailure);
        const { history } = this.props;
        history.push(`${RP_OBSERVATION_SCREEN_PATH}${observationId}`);
    }


    render() {

        const { assignedObservationListForRp, goToPreviousPage, goToNextPage, assignedObservationsCurrentPage,
            assignedObservationsTotalPages, goToRandomPage, filterAssignedObservationList, reportedOnSort, dueDateOnSort, userType } = this.getRpStore();
        return (
            <ObservationsAssignedToRp
                filterAssignedObservationList={filterAssignedObservationList}
                handleClick={this.onClickAddNew}
                observationList={assignedObservationListForRp}
                onClickObservation={this.onClickObservation}
                goToPreviousPage={goToPreviousPage}
                goToNextPage={goToNextPage}
                currentPage={assignedObservationsCurrentPage}
                totalPages={assignedObservationsTotalPages}
                goToRandomPage={goToRandomPage}
                userType={userType}
                navigateTOPage={this.navigateTOPage}
                reportedOnSort={reportedOnSort}
                dueDateOnSort={dueDateOnSort}


            />
        )
    }
}
withRouter(ObservationsAssignedToRpRoute)
export { ObservationsAssignedToRpRoute }
