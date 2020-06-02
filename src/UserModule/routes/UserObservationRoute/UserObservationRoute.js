import React, { Component } from 'react'
import { UserObservationPage } from '../../components/UserObservationPage'
import { observable, action, toJS } from 'mobx'
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
@inject("userStore")
@observer
class UserObservationRoute extends Component {

    @observable titleOfTheObservation = null;
    @observable cateogary = null;
    @observable subCateogary = null;
    @observable severity = null;
    @observable description = null;
    @observable attachments = null;
    @observable titleErrorMsg = '';
    @observable severityErrorMsg = '';
    @observable descriptionErrorMsg = ''

    constructor(props) {
        super(props);
        this.init();
    }

    init = () => {
        this.titleOfTheObservation = "";
        this.cateogary = "";
        this.subCateogary = "";
        this.severity = "";
        this.description = "";
        this.attachments = [];

    }
    componentDidMount = () => {
        this.props.userStore.getCateogaries({}, () => { }, () => { });
    }

    @action.bound onChangeTitleOfTheObservation(event) {

        this.titleOfTheObservation = event.target.value
        if (this.titleOfTheObservation === '')
            this.titleErrorMsg = 'Please enter title'
        else
            this.titleErrorMsg = ''
    }

    @action.bound onChangeCateogary(value) {
        this.cateogary = toJS(value).value;
        this.props.userStore.cateogary = toJS(value).value;

    }

    @action.bound onChangeSubCateogary(value) {
        this.subCateogary = toJS(value).value;
    }

    @action.bound onChangeSeverity(value) {
        this.severity = toJS(value).value;
        if (this.severity === '')
            this.severityErrorMsg = 'Please select severty'
        else
            this.severityErrorMsg = ''
    }

    @action.bound onChangeDescription(event) {
        this.description = event.target.value;
        if (this.description === '')
            this.descriptionErrorMsg = 'Please enter description'
        else
            this.descriptionErrorMsg = ''
    }

    @action.bound onHandliErrorMsg() {

        this.titleErrorMsg = ''
        this.severityErrorMsg = ''
        this.descriptionErrorMsg = '';
        if (this.titleOfTheObservation === '')
            this.titleErrorMsg = 'Please enter title'
        if (this.severity === '')
            this.severityErrorMsg = 'Please select severty'
        if (this.description === '')
            this.descriptionErrorMsg = 'Please enter description'
        if (this.titleOfTheObservation !== '' && this.severity !== '' && this.description !== '')
            return true;
    }


    @action.bound onClickSubmit() {
        if (this.onHandliErrorMsg()) {
            this.props.userStore.getPostObservationAPIStatus = 100;
            setTimeout(() => {
                const observation = {
                    titleOfTheObservation: this.titleOfTheObservation,
                    cateogary: this.cateogary,
                    subCateogary: this.subCateogary,
                    severity: this.severity,
                    description: this.description,
                    attachments: this.attachments
                }
                console.log(observation)
                this.props.userStore.addNewObservation(observation, this.onSuccess, this.onFailure);
                this.init();
                this.props.userStore.getPostObservationAPIStatus = 200;
                this.props.history.goBack();
            }, 2000)
        }
    }
    goBack = () => {
        this.props.history.goBack();
    }
    onSuccess() {
        alert("observation submitted successfully...")
    }
    onFailure() {
        alert("something went wrong pls try again...")
    }


    render() {
        const { getPostObservationAPIStatus, cateogaries, getSubCateogaries, cateogariesList } = this.props.userStore
        return (
            <UserObservationPage
                title={this.titleOfTheObservation}
                cateogaryOfObservation={this.cateogary}
                subCateogaryOfObservation={this.subCateogary}
                severityOfObservation={this.severity}
                descriptionOfObservation={this.description}
                attachmentsOfObservation={this.attachments}
                onClickSubmit={this.onClickSubmit}
                onChangeTitleOfTheObservation={this.onChangeTitleOfTheObservation}
                onChangeCateogary={this.onChangeCateogary}
                onChangeSubCateogary={this.onChangeSubCateogary}
                onChangeSeverity={this.onChangeSeverity}
                onChangeDescription={this.onChangeDescription}
                goBack={this.goBack}
                titleErrorMsg={this.titleErrorMsg}
                severityErrorMsg={this.severityErrorMsg}
                descriptionErrorMsg={this.descriptionErrorMsg}
                apiStatus={getPostObservationAPIStatus}
                cateogaries={cateogaries}
                cateogariesList={cateogariesList}
                getSubCateogaries={getSubCateogaries}
            />
        )
    }
}
withRouter(UserObservationPage)
export { UserObservationRoute }
