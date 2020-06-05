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
        this.props.userStore.getObservation({ id }, this.onSuccess, this.onFailure)
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
    onSuccess = () => {
        const { assignedTO, status, privacy, dueDate, cateogary, subCateogary } = this.props.userStore.observationDetails

        this.assignedTO = assignedTO;
        this.status = status;
        this.dueDate = dueDate;
        this.privacy = privacy;
        this.cateogary = cateogary;
        this.subCateogary = subCateogary;
        console.log(9887756454, this.privacy, this.assignedTO, this.status, this.dueDate);

    }
    onFailure = () => {
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
        let categoriesId = this.getCategoryAndSubCategoryId()
        const observation = {
            category_id: categoriesId[0],
            sub_category_id: categoriesId[1],
            status: this.status,
            cateogary: this.cateogary,
            due_date: this.dueDate,
            assigned_to_id: this.assignedTO,
            due_date_type: this.privacy

        }
        console.log(66666666666666666, observation);

        await this.props.userStore.updateObservationDeatails(observation, this.onSuccess, this.onFailure);
        this.init();
        this.props.history.goBack();
    }
    getCategoryAndSubCategoryId = () => {
        const { cateogaries } = this.props.userStore

        let category_id;
        let sub_category_id;
        category_id = cateogaries.find(cateogary => cateogary.category === this.cateogary).category_id
        cateogaries.forEach(cateogary => {
            if (cateogary.category === this.cateogary) {
                sub_category_id = cateogary.sub_catogiries.find(subCateogary => subCateogary.name === this.subCateogary).id
            }
        })
        return [category_id, sub_category_id]
    }


    render() {
        // console.log(this.props.userStore);
        const { title, severity, description, reportedOn,
            attachments } = this.props.userStore.observationDetails
        console.count("Render dor date", this.dueDate, this.privacy)
        console.log("Render dor date", this.dueDate, this.privacy)

        const { getObservationAPIStatus, getObservationAPIError, cateogaries, getSubCateogaries, cateogariesList } = this.props.userStore
        const { userType, currentPage } = this.props.location.state

        // console.log(1215555555534, getSubCateogaries, cateogaries, cateogariesList);
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
