import React, { Component } from 'react'
import './index.css'
import { DesktopLayoutMainPage } from '../../../common/components/DesktopLayoutMainPage'
import { PageHeader } from '../../../common/components/PageHeader'
import { PrimaryLeftIconDefault } from '../../../common/components/PrimaryLeftIconDefault'
import strings from '../../../common/i18n/strings.json'
import { ObseravationsHeader ,PageHeading,ObseravationsListTable} from './styledComponent'
import { ObservationListHeader } from '../../../common/components/ObservationListHeader'
import { ObservationListItem } from '../../../common/components/ObservationListItem'
import { observer } from 'mobx-react'
@observer
class UserObservatonListPage extends Component {
    render() {
        const {profilePic,username,handleClick,observationList}=this.props
        const {title,reportedOn,assignedTo,severty,status,dueDate,messages,addNew,listofObservations}=strings.userFeatures
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
                    <ObservationListHeader headings={[title,reportedOn,assignedTo,severty,status,dueDate,messages]}/>
                    
                    {observationList.length>0 &&
                     observationList.map(observation=>{
                         return <ObservationListItem
                                title={observation.title}
                                reportedOn={observation.reportedOn}
                                severty={observation.severty}
                                status={observation.status}
                                dueDate={observation.dueDate}
                                assignedTo={observation.assignedTo}
                                src={
                                    'https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/867a98d4-d61b-45cf-89cc-0a50a9dddb38@3x.png'
                                }/>
                     })}
                    
                       
                </ObseravationsListTable>
                
            </DesktopLayoutMainPage>
        )
    }
}
export {UserObservatonListPage}
