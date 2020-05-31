import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { withRouter } from 'react-router-dom';
import { RP_OBSERVATION_PATH, RP_OBSERVATION_SCREEN_PATH, RP_OBSERVATION_LIST_PATH, OBSERVATIONS_ASSIGNED_TO_RP } from '../../constants/RouteConstants'
import { RpObservatonListPage } from '../../components/RpObservatonListPage'

@inject("authStore", "userStore", "rpStore")
@observer
class RpObservatonListRoute extends Component {
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
        //console.log(123467, this.props.userStore.getObservationList())
        this.getRpStore().userStore.getObservationList();
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
        history.push(OBSERVATIONS_ASSIGNED_TO_RP)
    }
    onClickObservation = (observationId) => {
        this.getRpStore().userStore.getObservation({}, this.onSuccess, this.onFailure);
        const { history } = this.props;
        history.push(`${RP_OBSERVATION_SCREEN_PATH}${observationId}`);
    }

    render() {
        console.log(this.props.rpStore.observationList, this.props.userStore.observationList);

        const { observationList, goToPreviousPage, goToNextPage, currentPage, totalPages, goToRandomPage, userType } = this.getRpStore().userStore;
        return (
            <RpObservatonListPage
                handleClick={this.onClickAddNew}
                observationList={observationList}
                onClickObservation={this.onClickObservation}
                goToPreviousPage={goToPreviousPage}
                goToNextPage={goToNextPage}
                currentPage={currentPage}
                totalPages={totalPages}
                goToRandomPage={goToRandomPage}
                userType={userType}
                navigateTOPage={this.navigateTOPage}

            />
        )
    }
}
withRouter(RpObservatonListRoute)
export { RpObservatonListRoute }
