import React, { Component } from 'react'
import { observable, action } from 'mobx'
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { ObservationScreen } from '../../../common/components/ObservationScreen';
@inject("userStore")
@observer
class RpObservationScreenRoute extends Component {

    @observable dueDate = null;
    @observable privacy = null;
    @observable status = null;
    @observable severity = null;
    @observable description = null;
    @observable assignedTO = null;
    cateogary = null;
    subCateogary = null;
    titleOfTheObservation = null;
    attachments = null;
    reportedOn = null;

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

    @action.bound onChangePrivacy(event) {
        this.privacy = event.target.value

    }

    @action.bound onChangeAssignedTO(event) {
        this.assignedTO = event.target.value
    }

    @action.bound onChangeDueDate(event) {
        this.dueDate = event.target.value
    }

    @action.bound onChangeStatus(event) {
        this.status = event.target.value
    }

    @action.bound onChangeDescription(event) {
        this.description = event.target.value
    }

    @action.bound onReset() {
        this.init();
    }
    goBack = () => {
        this.props.history.goBack()
    }
    onUpdate() {
        alert("observation updated successfully...")
    }
    onFailure() {
        alert("something went wrong pls try again...")
    }


    render() {
        console.log(this.props.userStore);
        const { title, cateogary, subCateogary, severity, description, reportedOn,
            attachments, assignedTO, status, dueDate, privacy } = this.props.userStore.observationDetails
        const { userType } = this.props.userStore
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
            />
        )
    }
}
withRouter(RpObservationScreenRoute)
export { RpObservationScreenRoute }
