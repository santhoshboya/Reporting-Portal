
import React, { Component } from 'react'
import { ListOfObservations } from "../../components/ListOfObservations";
import { observable, toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import { OBSERVATION_SCREEN_PATH } from '../../constants/RouteConstants'

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
        this.getAdminStore().getCateogaries({}, () => { }, () => { });
        const { observationsSortType, observationsSortOption, statusFilterOfList } = this.props.adminStore
        let details = {
            "sort_on": observationsSortType,
            "sort_by": observationsSortOption,
            "filter_on": statusFilterOfList,
            "categories": [],
            "sub_categories": []
        };

        this.getAdminStore().getAdminObservationList(details);
    }

    getCategoryAndSubCategoryId = () => {



        // const { cateogaries } = this.props.userStore
        // let category_id;
        // let sub_category_id;
        // if (cateogaries.length > 1) {
        //     let temp = cateogaries.find(cateogary => cateogary.name === this.cateogary)
        //     if (temp)
        //         category_id = temp.category_id
        //     else
        //         return [0, 0]



        //     cateogaries.forEach(cateogary => {
        //         if (cateogary.name === this.cateogary) {
        //             sub_category_id = cateogary.sub_categories.find(subCateogary => subCateogary.name === this.subCateogary).sub_category_id
        //             console.log(cateogary, 999999999999999);

        //         }
        //     })
        //     return [category_id, sub_category_id]
        // }
        // return [0, 0]
    }

    onSuccess = () => {
        //alert("data recieved")
    }
    onFailure = () => {
        //alert("data recieved")
    }
    onClickObservation = (observationId) => {
        console.log(this.props, 567890);

        this.props.history.push({
            pathname: `${OBSERVATION_SCREEN_PATH}${observationId}`,
            state: { userType: "admin", currentPage: "Total Observations" }
        })
    }
    filterCategory = (value) => {
        console.log(12243, value);
        this.getAdminStore().filterCategory(value)
    }
    filterSubCategory = (value) => {
        this.getAdminStore().filterSubCategory(value)
    }
    setStatusFilterOfList = (value) => {
        this.getAdminStore().setStatusFilterOfList(value)
    }

    render() {
        const { adminObservationsList, goToPreviousObservations, goToNextObservations,
            goToRandomObservations, listOfObservationsTotalPages, listOfObservationsCurrentPage,
            userType, categotyFilterType, subCategotyFilterType, adminObservationsListAPIStatus, adminObservationsListAPIError,
            cateogaries, getSubCateogaries, cateogariesList, getSubCateogariesMultiple, statusFilterOfList } = this.getAdminStore();



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
                adminObservationsListAPIError={adminObservationsListAPIError}
                adminObservationsListAPIStatus={adminObservationsListAPIStatus}
                onRetryClick={this.doNetworkCalls}
                cateogaries={cateogaries}
                getSubCateogaries={getSubCateogaries}
                cateogariesList={cateogariesList}
                getSubCateogariesMultiple={getSubCateogariesMultiple}
                statusFilterOfList={statusFilterOfList}
                setStatusFilterOfList={this.setStatusFilterOfList}
            />
        )
    }
}
export { ListOfObservationsRoute }
