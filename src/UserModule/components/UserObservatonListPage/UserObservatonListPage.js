import React, { Component } from 'react'
import './index.css'
import { DesktopLayoutMainPage } from '../../../common/components/DesktopLayoutMainPage'
import { PageHeader } from '../../../common/components/PageHeader'
import { PrimaryLeftIconDefault } from '../../../common/components/PrimaryLeftIconDefault'
import strings from '../../../common/i18n/strings.json'
import { ObseravationsHeader ,PageHeading,ObseravationsListTable} from './styledComponent'
import { ObservationListHeader } from '../../../common/components/ObservationListHeader'
import { ObservationListItem } from '../../../common/components/ObservationListItem'
class UserObservatonListPage extends Component {
    render() {
        const {profilePic,username,handleClick}=this.props
        const {addNew,listofObservations,assignedTo}=strings.userFeatures
        return (
            <DesktopLayoutMainPage>
                <PageHeader 
                    src={profilePic} 
                    username={username}/>
                <ObseravationsHeader>
                    <PageHeading>{listofObservations}</PageHeading>
                    <PrimaryLeftIconDefault 
                    className={'Primary-Left-IconDefault'}
                    value={addNew} 
                    handleClick={handleClick} 
                    src={'https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/7930d80d-a88c-485e-b54b-4239b82c39f0.svg'}/>
                </ObseravationsHeader>
                <ObseravationsListTable>
                    <ObservationListHeader personType={assignedTo}/>
                    <ObservationListItem
                        title={'santhu'}
                        reportedOn={'11/11/11'}
                        severty={'HIGH'}
                        status={'action in progress'}
                        dueDate={'12/2/31'}
                        src={
                            'https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/867a98d4-d61b-45cf-89cc-0a50a9dddb38@3x.png'
                        }/>
                        <ObservationListItem
                        title={'santhu'}
                        reportedOn={'11/11/11'}
                        severty={'HIGH'}
                        status={'action in progress'}
                        dueDate={'12/2/31'}
                        src={
                            'https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/867a98d4-d61b-45cf-89cc-0a50a9dddb38@3x.png'
                        }/>
                        <ObservationListItem
                        title={'santhu'}
                        reportedOn={'11/11/11'}
                        severty={'HIGH'}
                        status={'action in progress'}
                        dueDate={'12/2/31'}
                        src={
                            'https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/867a98d4-d61b-45cf-89cc-0a50a9dddb38@3x.png'
                        }/>
                </ObseravationsListTable>
                
            </DesktopLayoutMainPage>
        )
    }
}
export {UserObservatonListPage}
