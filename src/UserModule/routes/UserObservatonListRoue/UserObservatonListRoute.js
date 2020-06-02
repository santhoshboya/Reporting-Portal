import React, { Component } from 'react'
import { UserObservatonListPage } from '../../components/UserObservatonListPage'
import { observer, inject } from 'mobx-react'
import { withRouter } from 'react-router-dom';
import { USER_OBSERVATION_PATH, USER_OBSERVATION_SCREEN_PATH } from '../../constants/RouteConstants'
import { toJS } from 'mobx';


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
    filterObservationList = (value) => {
        this.props.userStore.filterObservationList(toJS(value).value)
    }
    render() {
        const { observationList, goToPreviousPage, goToNextPage, currentPage, totalPages,
            goToRandomPage, reportedOnSort, dueDateOnSort, filterType, userType } = this.getUserStore();
        const username = "Santhosh";
        const profilePic = ""
        console.log(1234, userType);


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
                dueDateOnSort={dueDateOnSort}
                reportedOnSort={reportedOnSort}
                filterType={filterType}
                filterObservationList={this.filterObservationList}
                userType={userType}

            />
        )
    }
}
withRouter(UserObservatonListRoute)
export { UserObservatonListRoute }
