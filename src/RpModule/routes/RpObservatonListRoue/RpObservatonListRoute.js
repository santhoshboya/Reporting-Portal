import React, { Component } from 'react'
import { RpObservatonListPage } from '../../components/RpObservatonListPage'
import { observer, inject } from 'mobx-react'
import { withRouter } from 'react-router-dom';
import { RP_OBSERVATION_PATH, RP_OBSERVATION_SCREEN_PATH } from '../../constants/RouteConstants'


@inject("authStore", "RpStore")
@observer
class RpObservatonListRoute extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        this.doNetworkCalls();
    }

    getRpStore = () => {
        return this.props.userStore;
    }

    doNetworkCalls = () => {
        this.getRpStore().getObservationList();
    }
    onClickAddNew = () => {
        const { history } = this.props
        history.push(RP_OBSERVATION_PATH)
    }
    onSuccess() {
        alert("data recieved")
    }
    onFailure() {
        alert("data recieved")
    }
    onClickObservation = () => {
        this.getUserStore().getObservation({}, this.onSuccess, this.onFailure);
        const { history } = this.props;
        history.push(RP_OBSERVATION_SCREEN_PATH);
    }
    render() {
        const { observationList } = this.getUserStore();
        const username = "Santhosh";
        const profilePic = ""
        return (
            <RpObservatonListPage
                handleClick={this.onClickAddNew}
                observationList={observationList}
                username={username}
                profilePic={profilePic}
                onClickObservation={this.onClickObservation}
            />
        )
    }
}
withRouter(RpObservatonListRoute)
export { RpObservatonListRoute }
