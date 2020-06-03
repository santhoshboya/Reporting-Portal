import React, { Component } from 'react'
import { observable, action, toJS } from 'mobx'
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { ObservationScreen } from '../../../common/components/ObservationScreen';
import { RP_OBSERVATION_LIST_PATH, USER_OBSERVATION_LIST_PATH } from '../../constants/RouteConstants'
@inject("userStore")
@observer
class UserObservationScreenRoute extends Component {
    @observable titleOfTheObservation = null;
    @observable description = null;
    @observable cateogary = null;
    @observable subCateogary = null;
    @observable status = null;
    @observable severity = null;
    @observable attachments = null;
    @observable assignedTO = null;
    @observable reportedOn = null;
    @observable dueDate = null;
    @observable privacy = null;
    constructor(props) {
        super(props);
        this.init();
    }

    init = () => {
        this.description = "";
        this.attachments = [];
        this.assignedTO = "";
        this.status = "";
        this.dueDate = "";
        this.privacy = "";
    }
    componentDidMount = () => {
        this.doNetworkCalss();
    }
    doNetworkCalss = () => {
        this.props.userStore.getObservation({}, this.onSuccess, this.onFailure);
    }

    @action.bound onChangePrivacy(event) {
        this.privacy = event.target.value

    }

    @action.bound onChangeAssignedTO(value) {
        this.assignedTO = toJS(value).value
    }

    @action.bound onChangeDueDate(event) {
        this.dueDate = event.target.value;
    }

    @action.bound onChangeStatus(value) {
        this.status = toJS(value).value
    }

    @action.bound onChangeDescription(event) {
        this.description = event.target.value
    }

    @action.bound onReset() {
        this.init();
    }
    goBack = () => {
        this.props.history.goBack();
    }
    onSuccess() {
        //alert("observation submitted successfully...")
    }
    onFailure() {
        //alert("something went wrong pls try again...")
    }
    @action.bound onUpdate() {
        let { updateObservationAPIStatus } = this.props.rpStore;
        updateObservationAPIStatus = 100;
        setTimeout(() => {
            const observation = {
                description: this.description,
                status: this.status,
                subCateogary: this.subCateogary,
                dueDate: this.dueDate,
                assignedTO: this.assignedTO,
                privacy: this.privacy
            }
            this.props.rpStore.updateObservationDeatails(observation, this.onSuccess, this.onFailure);
            this.init();
            updateObservationAPIStatus = 200;
            alert("observation updated successfully...")
            this.props.history.goBack();
        }, 500)


    }


    render() {
        console.log(this.props.userStore);
        const { title, cateogary, subCateogary, severity, description, reportedOn,
            attachments, assignedTO, status, dueDate, privacy } = this.props.userStore.observationDetails
        const { userType, getObservationAPIStatus, getObservationAPIError } = this.props.userStore
        console.log("scren", userType);

        return (
            <ObservationScreen
                userType={userType}
                title={title}
                cateogaryOfObservation={cateogary}
                subCateogaryOfObservation={subCateogary}
                severityOfObservation={severity}
                reportedOnOfObservation={reportedOn}
                descriptionOfObservation={description}
                attachmentsOfObservation={attachments}
                onChangePrivacy={this.onChangePrivacy}
                onChangeAssignedTO={this.onChangeAssignedTO}
                onChangeDueDate={this.onChangeDueDate}
                onChangeStatus={this.onChangeStatus}
                onUpdate={this.onUpdate}
                onChangeDescription={this.onChangeDescription}
                goBack={this.goBack}
                onReset={this.onReset}
                assignedToOfObservation={assignedTO}
                statusOfObservation={status}
                dueDateOfObservation={dueDate}
                privacyOfObservation={privacy}
                apiStatus={getObservationAPIStatus}
                apiError={getObservationAPIError}
                onRetryClick={this.doNetworkCalss}
            />
        )
    }
}
withRouter(UserObservationScreenRoute)
export { UserObservationScreenRoute }
