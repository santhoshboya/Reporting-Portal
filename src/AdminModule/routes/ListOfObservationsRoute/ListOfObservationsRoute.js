
import React, { Component } from 'react'
import { ListOfObservations } from "../../components/ListOfObservations";
import { observable, toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import { ADMIN_OBSERVATION_SCREEN_PATH } from '../../constants/RouteConstants'

@inject("adminStore")
@observer
class ListOfObservationsRoute extends Component {

    constructor(props) {
        super(props);
    }


    componentDidMount = () => {
        this.doNetworkCalls();
    }

    getAdminStore = () => {
        return this.props.adminStore;
    }

    doNetworkCalls = () => {
        this.getAdminStore().getAdminObservationList();
    }
    onSuccess = () => {
        //alert("data recieved")
    }
    onFailure = () => {
        //alert("data recieved")
    }
    onClickObservation = (observationId) => {
        const { history } = this.props;
        history.push(`${ADMIN_OBSERVATION_SCREEN_PATH}${observationId}`);
    }
    filterCategory = (value) => {
        this.getAdminStore().filterCategory(toJS(value).value)
    }
    filterSubCategory = (value) => {
        this.getAdminStore().filterSubCategory(toJS(value).value)
    }
    render() {
        const { adminObservationsList, goToPreviousObservations, goToNextObservations,
            goToRandomObservations, listOfObservationsTotalPages, listOfObservationsCurrentPage,
            userType, categotyFilterType, subCategotyFilterType } = this.getAdminStore();
        console.log(123, adminObservationsList, this.getAdminStore().adminObservationsList, this.getAdminStore());


        return (
            <ListOfObservations
                observationList={adminObservationsList}
                onClickObservation={this.onClickObservation}
                goToPreviousPage={goToPreviousObservations}
                goToNextPage={goToNextObservations}
                goToRandomPage={goToRandomObservations}
                totalPages={listOfObservationsTotalPages}
                currentPage={listOfObservationsCurrentPage}
                filterCategory={this.filterCategory}
                filterSubCategory={this.filterSubCategory}
                userType={userType}
                navigateTOPage={this.navigateTOPage}
                categotyFilterType={categotyFilterType}
                subCategotyFilterType={subCategotyFilterType}
            />
        )
    }
}
export { ListOfObservationsRoute }
