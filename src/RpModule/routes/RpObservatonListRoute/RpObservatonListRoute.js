import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { withRouter } from 'react-router-dom';
import {
    RP_OBSERVATION_PATH, RP_OBSERVATION_SCREEN_PATH, OBSERVATIONS_ASSIGNED_TO_RP
} from '../../constants/RouteConstants'
import { RpObservatonListPage } from '../../components/RpObservatonListPage'
import { toJS } from 'mobx';

@inject("rpStore")
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
        this.getRpStore().getObservationList();
    }
    onClickAddNew = () => {
        const { history } = this.props
        history.push(RP_OBSERVATION_PATH)
    }
    onSuccess = () => {
        //alert("data recieved")
    }
    onFailure = () => {
        //alert("data recieved")
    }
    navigateTOPage = (page) => {
        const { history } = this.props
        history.push(OBSERVATIONS_ASSIGNED_TO_RP)
    }
    onClickObservation = (observationId) => {
        const { history } = this.props;
        history.push(`${RP_OBSERVATION_SCREEN_PATH}${observationId}`);
    }
    filterObservationList = (value) => {
        this.props.rpStore.filterObservationList(toJS(value).value)
    }

    render() {
        const { observationList, goToPreviousPage, goToNextPage,
            goToRandomPage, totalPages, currentPage,
            userType, filterType } = this.getRpStore();

        console.log(234, userType)
        return (
            <RpObservatonListPage
                handleClick={this.onClickAddNew}
                observationList={observationList}
                onClickObservation={this.onClickObservation}
                goToPreviousPage={goToPreviousPage}
                goToNextPage={goToNextPage}
                goToRandomPage={goToRandomPage}
                totalPages={totalPages}
                currentPage={currentPage}
                filterObservationList={this.filterObservationList}
                userType={userType}
                navigateTOPage={this.navigateTOPage}
                filterType={filterType}

            />
        )
    }
}
withRouter(RpObservatonListRoute)
export { RpObservatonListRoute }
