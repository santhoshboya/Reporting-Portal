import React, { Component } from 'react'
import { observable, action, toJS } from 'mobx'
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { ObservationScreen } from '../../../common/components/ObservationScreen';
import {
    RP_OBSERVATION_LIST_PATH, USER_OBSERVATION_LIST_PATH,
    LIST_OF_OBSERVATIONS_PATH, OBSERVATIONS_ASSIGNED_TO_RP
} from '../../constants/RouteConstants'
import strings from '../../../common/i18n/strings.json'
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

        this.assignedTO = "";
        this.status = "";
        this.dueDate = "";
        this.privacy = "";
        this.cateogary = '';
        this.subCateogary = null;
    }
    componentDidMount = () => {
        this.doNetworkCalss();
    }
    doNetworkCalss = () => {


        this.props.userStore.getCateogaries({}, () => { }, () => { });
        const { id } = this.props.match.params
        console.log(id);
        this.props.userStore.getObservation({ id }, this.onSuccess, this.onFailure).then(() => {
            const { assignedTO, status, privacy, dueDate, cateogary, subCateogary } = this.props.userStore.observationDetails

            this.assignedTO = assignedTO;
            this.status = status;
            this.dueDate = privacy;
            this.privacy = dueDate;
            this.cateogary = cateogary;
            this.subCateogary = subCateogary;
            console.log(123, this.privacy, this.assignedTO, this.status, this.dueDate);

        })
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

    @action.bound onChangeCategory(value) {
        this.cateogary = toJS(value).value
        this.subCateogary = null;
        this.props.userStore.cateogary = toJS(value).value;
    }
    @action.bound onChangeSubCategory(value) {
        this.subCateogary = toJS(value).value

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
    navigateTOPage = (page) => {
        const { totalObservations, categories, myObservations, assignedToMe } = strings.rpFeatures
        switch (page) {
            case totalObservations:
                this.props.history.push(`${LIST_OF_OBSERVATIONS_PATH}`)
                break;
            case myObservations:
                this.props.history.push(`${RP_OBSERVATION_LIST_PATH}`)
                break;
            case assignedToMe:
                this.props.history.push(`${OBSERVATIONS_ASSIGNED_TO_RP}`)
                break;
            case categories:
                break;

        }
    }
    @action.bound onUpdate = async () => {
        const observation = {
            description: this.description,
            status: this.status,
            subCateogary: this.subCateogary,
            dueDate: this.dueDate,
            assignedTO: this.assignedTO,
            privacy: this.privacy
        }
        console.log(1234, observation);

        await this.props.userStore.updateObservationDeatails(observation, this.onSuccess, this.onFailure);
        this.init();
        this.props.history.goBack();
    }


    render() {
        console.log(this.props.userStore);
        const { title, severity, description, reportedOn,
            attachments } = this.props.userStore.observationDetails


        const { getObservationAPIStatus, getObservationAPIError, cateogaries, getSubCateogaries, cateogariesList } = this.props.userStore
        const { userType, currentPage } = this.props.location.state

        console.log(12134, getSubCateogaries, cateogaries, cateogariesList);
        return (
            <ObservationScreen
                userType={userType}
                currentPage={currentPage}
                title={title}
                cateogaryOfObservation={this.cateogary}
                subCateogaryOfObservation={this.subCateogary}
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
                onChangeCategory={this.onChangeCategory}
                onChangeSubCategory={this.onChangeSubCategory}
                goBack={this.goBack}
                onReset={this.onReset}
                assignedToOfObservation={this.assignedTO}
                statusOfObservation={this.status}
                dueDateOfObservation={this.dueDate}
                privacyOfObservation={this.privacy}
                apiStatus={getObservationAPIStatus}
                apiError={getObservationAPIError}
                onRetryClick={this.doNetworkCalss}
                navigateTOPage={this.navigateTOPage}
                cateogaries={cateogaries}
                getSubCateogaries={getSubCateogaries}
                cateogariesList={cateogariesList}
            />
        )
    }
}
withRouter(UserObservationScreenRoute)
export { UserObservationScreenRoute }
