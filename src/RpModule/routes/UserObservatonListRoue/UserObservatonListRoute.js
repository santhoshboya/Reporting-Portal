import React, { Component } from 'react'
import { UserObservatonListPage } from '../../components/RpObservatonListPage'
import { observer, inject } from 'mobx-react'
import { withRouter } from 'react-router-dom';
import { USER_OBSERVATION_PATH, USER_OBSERVATION_SCREEN_PATH } from '../../constants/RouteConstants'


@inject("authStore", "userStore")
@observer
class UserObservatonListRoute extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        this.doNetworkCalls();
    }

    getUserStore = () => {
        return this.props.userStore;
    }

    doNetworkCalls = () => {
        this.getUserStore().getObservationList();
    }
    onClickAddNew = () => {
        const { history } = this.props
        history.push(USER_OBSERVATION_PATH)
    }
    onSuccess = () => {
        alert("data recieved")
    }
    onFailure = () => {
        alert("data recieved")
    }
    onClickObservation = (observationId) => {
        this.getUserStore().getObservation({}, this.onSuccess, this.onFailure);
        const { history } = this.props;
        history.push(`${USER_OBSERVATION_SCREEN_PATH}${observationId}`);
    }
    render() {
        const { observationList, goToPreviousPage, goToNextPage, currentPage, totalPages, goToRandomPage } = this.getUserStore();
        const username = "Santhosh";
        const profilePic = ""

        return (
            <UserObservatonListPage
                handleClick={this.onClickAddNew}
                observationList={observationList}
                username={username}
                profilePic={profilePic}
                onClickObservation={this.onClickObservation}
                goToPreviousPage={goToPreviousPage}
                goToNextPage={goToNextPage}
                currentPage={currentPage}
                totalPages={totalPages}
                goToRandomPage={goToRandomPage}

            />
        )
    }
}
withRouter(UserObservatonListRoute)
export { UserObservatonListRoute }
