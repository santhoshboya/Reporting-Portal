import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'

import { withTranslation } from 'react-i18next'
import EditIcon from '../../../../Common/icons/EditIcon'
import DeleteIcon from '../../../../Common/icons/DeleteIcon'
import { showConfirmDialog } from '../../../../Common/utils/ConfirmationDialogUtils'

import { TeamsModel } from '../../../stores/models/TeamsModel'
import { RolesModel } from '../../../stores/models/RolesModel'
import { UserModel } from '../../../stores/models/UserModel'
import {
   DataLink,
   Thead,
   TableRow,
   TableData,
   Wrapper,
   OptionsContaner,
   Icon
} from './styledComponents'

interface WithTranslationProps {
   t: any
   i18n: any
   tReady: boolean
}

interface UserProps extends WithTranslationProps {
   user: UserModel
   onClickEditUser: (userId: string) => void
   onClickDeleteUser: (userId: string) => void
   sno: number
}

@observer
class User extends Component<UserProps> {
   @observable canDislayOptions = false

   renderTeamDetails = (teams: Array<TeamsModel>) =>
      teams.map(team => (
         <Wrapper key={team.teamId}>
            <DataLink>{team.teamName}</DataLink>
         </Wrapper>
      ))

   renderRoleDetails = (roles: Array<RolesModel>) =>
      roles.map(role => (
         <Wrapper key={role.roleId}>
            <DataLink>{role.roleName}</DataLink>
         </Wrapper>
      ))

   showOptions = (boolean: boolean) => (this.canDislayOptions = boolean)

   render() {
      const {
         canDislayOptions,
         renderTeamDetails,
         renderRoleDetails,
         showOptions
      } = this
      const { user, onClickEditUser, onClickDeleteUser, t, sno } = this.props
      return (
         <Thead
            key={user.userId}
            onMouseOver={() => showOptions(true)}
            onMouseOut={() => showOptions(false)}
         >
            <TableRow as='tr'>
               <TableData>{sno}</TableData>
               <TableData>{user.name}</TableData>
               <TableData>{user.email}</TableData>
               <TableData>{renderTeamDetails(user.teams)}</TableData>
               <TableData>{renderRoleDetails(user.roles)}</TableData>
               <TableData>{user.companyName}</TableData>
               <OptionsContaner {...{ canDislayOptions }}>
                  <Icon onClick={() => onClickEditUser(user.userId)}>
                     <EditIcon />
                  </Icon>
                  <Icon
                     onClick={() =>
                        showConfirmDialog({
                           message: t('iam:users.deleteUser.confirmMessage'),
                           onConfirm: () => onClickDeleteUser(user.userId)
                        })
                     }
                  >
                     <DeleteIcon />
                  </Icon>
               </OptionsContaner>
            </TableRow>
         </Thead>
      )
   }
}

export default withTranslation('translation', { withRef: false })(User)
