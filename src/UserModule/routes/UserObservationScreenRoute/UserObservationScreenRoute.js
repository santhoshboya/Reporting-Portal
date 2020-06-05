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
const ADMIN = "Admin"
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
        this.privacy = null;
        this.cateogary = '';
        this.subCateogary = null;
    }
    componentDidMount = () => {
        this.doNetworkCalss();
    }
    doNetworkCalss = () => {


        const { id } = this.props.match.params

        this.props.userStore.getObservation(id, this.onSuccess, this.onFailure)
        this.props.userStore.getCateogaries({}, () => { }, () => { });
    }

    @action.bound onChangePrivacy(event) {
        this.privacy = event.target.value

    }

    @action.bound onChangeAssignedTO(value) {
        this.assignedTO = toJS(value).value
    }

    @action.bound onChangeDueDate(event) {
        console.log(1111111111111111111119999999999999999999999999999, event);

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
        const { assigned_to, status, due_date_type, due_date, category, sub_category } = this.props.userStore.observationDetails

        this.assignedTO = assigned_to.first_name;
        this.status = status;
        this.dueDate = due_date;
        this.privacy = due_date_type;
        this.cateogary = category.name;
        this.subCateogary = sub_category.name;


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
        const { id } = this.props.match.params
        let typeOfUser = this.props.location.state.userType
        let observation;
        if (typeOfUser === ADMIN) {
            observation = {
                observation_id: id,
                category_id: this.getCategoryAndSubCategoryId()[0],
                sub_category_id: this.getCategoryAndSubCategoryId()[1]
            }

        }
        else {
            let due_date = null;
            if (this.dueDate)
                due_date = `${this.dueDate.slice(0, 10)} ${this.dueDate.slice(11)}`
            observation = {
                observation_id: id,
                status: this.status,
                due_date: due_date,
                assigned_to_id: this.getAssignedToId(),
                due_date_type: this.privacy
            }
        }
        console.log(6666666666666666600000000000000000000000000, typeOfUser, observation);

        await this.props.userStore.updateObservationDeatails(typeOfUser, observation);
        this.init();
        this.props.history.goBack();
    }

    //change,.............
    getAssignedToId = () => {
        if (this.assignedTO != "") {
            return this.props.userStore.rpList.find(rp => rp.first_name === this.assignedTO).user_id;

        }
    }
    getCategoryAndSubCategoryId = () => {
        if (this.cateogary == null)
            return [0, 0]
        const { cateogaries } = this.props.userStore
        let category_id = 0;
        let sub_category_id = 0;
        let category = cateogaries.find(cateogary => cateogary.name === this.cateogary)
        if (category)
            category_id = category.category_id
        cateogaries.forEach(cateogary => {
            if (cateogary.name === this.cateogary) {
                cateogary.sub_categories.forEach(subCateogary => {
                    if (subCateogary.name === this.subCateogary)
                        sub_category_id = subCateogary.sub_category_id
                })
            }
        })
        console.log(444444444444444444444444444444444444, category_id, sub_category_id);

        return [category_id, sub_category_id]
    }

    getComputedRpList = () => {
        let rpList = [];
        this.props.userStore.rpList.forEach(rp => {
            rpList.push(rp.first_name)
        })
        console.log(rpList);
        return rpList;

    }

    render() {
        // console.log(this.props.userStore);
        const { title, severity, description, reported_on,
            attachments } = this.props.userStore.observationDetails
        console.count("Render dor date", this.dueDate, this.privacy)
        console.log("Render dor date", this.dueDate, this.privacy)

        const { getObservationAPIStatus, getObservationAPIError, cateogaries, getSubCateogaries, rpList, cateogariesList } = this.props.userStore
        const { userType, currentPage } = this.props.location.state

        // console.log(1215555555534, getSubCateogaries, cateogaries, cateogariesList);
        console.log(222222222222222, rpList, this.getComputedRpList());

        return (
            <ObservationScreen
                userType={userType}
                currentPage={currentPage}
                title={title}
                rpList={this.getComputedRpList()}
                cateogaryOfObservation={this.cateogary}
                subCateogaryOfObservation={this.subCateogary}
                severityOfObservation={severity}
                reportedOnOfObservation={reported_on}
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
