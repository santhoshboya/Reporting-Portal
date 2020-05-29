import React, { Component } from 'react'
import { UserObservationPage } from '../../components/UserObservationPage'
import { observable, action } from 'mobx'
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
    @observable descriptionErrorMsg = ';'
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

    @action.bound onChangeTitleOfTheObservation(event) {

        this.titleOfTheObservation = event.target.value
        console.log(this.titleOfTheObservation);
    }

    @action.bound onChangeCateogary(event) {
        this.cateogary = event.target.value
    }

    @action.bound onChangeSubCateogary(event) {
        this.subCateogary = event.target.value
    }

    @action.bound onChangeSeverity(event) {
        this.severity = event.target.value
    }

    @action.bound onChangeDescription(event) {
        this.description = event.target.value
    }

    @action.bound onClickSubmit() {

        this.titleErrorMsg = ''
        this.severityErrorMsg = ''
        this.descriptionErrorMsg = '';
        if (this.titleOfTheObservation === '')
            this.titleErrorMsg = 'Please enter title'
        else if (this.severity === '')
            this.severityErrorMsg = 'Please select severty'
        else if (this.description === '')
            this.descriptionErrorMsg = 'Please enter description'
        else
            this.onSubmit();
    }

    @action.bound onSubmit() {
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
    }
    goBack = () => {
        this.props.history.push('/userobservationslist')
    }
    onSuccess() {
        alert("observation submitted successfully...")
    }
    onFailure() {
        alert("something went wrong pls try again...")
    }


    render() {
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
            />
        )
    }
}
withRouter(UserObservationPage)
export { UserObservationRoute }
