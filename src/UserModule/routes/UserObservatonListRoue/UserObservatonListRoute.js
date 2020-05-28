import React, { Component } from 'react'
import { UserObservatonListPage } from '../../components/UserObservatonListPage'
import { observer,inject } from 'mobx-react'
import { withRouter } from 'react-router-dom';
import {USER_OBSERVATION_PATH} from '../../constants/RouteConstants'


@inject("authStore","userStore")
@observer
class UserObservatonListRoute extends Component {
    constructor(props)
    {
        super(props);
    }
    
    componentDidMount=()=>{
        this.doNetworkCalls();   
    }

    getUserStore=()=>{
        return this.props.userStore;
    }

    doNetworkCalls=()=>{    
        this.getUserStore().getObservationList();
    }
    onClickAddNew=()=>{
        const {history}=this.props
        history.push(USER_OBSERVATION_PATH)    
    }
    render() {
        const {observationList}=this.getUserStore();
        const username="Santhosh";
        const profilePic=""
        return (
            <UserObservatonListPage
                handleClick={this.onClickAddNew}
                observationList={observationList}
                username={username}
                profilePic={profilePic}
            />
        )
    }
}
withRouter(UserObservatonListRoute)
export {UserObservatonListRoute}
