import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { withRouter } from 'react-router-dom';
import {
    RP_OBSERVATION_PATH, RP_OBSERVATION_SCREEN_PATH, OBSERVATIONS_ASSIGNED_TO_RP
} from '../../constants/RouteConstants'
import { RpObservatonListPage } from '../../components/RpObservatonListPage'

@inject("rpStore")
@observer
class RpObservatonListRoute extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        this.doNetworkCalls();
    }

    getRpStore = () => {
        return this.props.rpStore;
    }

    doNetworkCalls = () => {
        //this.getRpStore().userStore.getObservationList();
        this.getRpStore().getObservationList();
    }
    onClickAddNew = () => {
        const { history } = this.props
        history.push(RP_OBSERVATION_PATH)
    }
    onSuccess = () => {
        alert("data recieved")
    }
    onFailure = () => {
        alert("data recieved")
    }
    navigateTOPage = (page) => {
        const { history } = this.props
        history.push(OBSERVATIONS_ASSIGNED_TO_RP)
    }
    onClickObservation = (observationId) => {
        this.getRpStore().getObservation({}, this.onSuccess, this.onFailure);
        const { history } = this.props;
        history.push(`${RP_OBSERVATION_SCREEN_PATH}${observationId}`);
    }

    render() {
        const { observationList, assignedObservationsGoToPreviousPage, assignedObservationsGoToNextPage, filterObservationList,
            assignedObservationsGoToRandomPage, totalPages,
            userType, filterType } = this.getRpStore();
        console.log(234, this.getRpStore().observationList)
        return (
            <RpObservatonListPage
                handleClick={this.onClickAddNew}
                observationList={observationList}
                onClickObservation={this.onClickObservation}
                assignedObservationsGoToPreviousPage={assignedObservationsGoToPreviousPage}
                assignedObservationsGoToNextPage={assignedObservationsGoToNextPage}
                assignedObservationsGoToRandomPage={assignedObservationsGoToRandomPage}
                totalPages={totalPages}
                assignedObservationsGoToRandomPage={assignedObservationsGoToRandomPage}
                filterObservationList={filterObservationList}
                userType={userType}
                navigateTOPage={this.navigateTOPage}
                filterType={filterType}

            />
        )
    }
}
withRouter(RpObservatonListRoute)
export { RpObservatonListRoute }
