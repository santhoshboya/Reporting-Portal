import { observer } from 'mobx-react'
import React, { Component } from 'react'

import { UserModel } from '../../../stores/models/UserModel'

import { User } from '../User'

import {
   UserListWrapper,
   Table,
   TableHeading,
   TableRow,
   Thead
} from './styledComponents'

interface UserListProps {
   usersList?: Array<UserModel>
   navigateToEditDetailsScreen: (userId: string) => void
   onClickDeleteUser: (userId: string) => void
   offset: number
}

const listHeaders = ['SNO', 'NAME', 'EMAIL', 'TEAM', 'ROLES', 'COMPANY', '']

@observer
class UserList extends Component<UserListProps> {
   renderTableHeadingRow = () => (
      <Thead>
         <TableRow as='tr'>
            {listHeaders.map(heading => (
               <TableHeading key={heading}>{heading}</TableHeading>
            ))}
         </TableRow>
      </Thead>
   )

   renderUserTableRows = userListData => {
      const {
         navigateToEditDetailsScreen,
         onClickDeleteUser,
         offset
      } = this.props
      return userListData.map((user, index) => (
         <User
            key={user.userId}
            user={user}
            onClickEditUser={navigateToEditDetailsScreen}
            onClickDeleteUser={onClickDeleteUser}
            sno={offset + index + 1}
         />
      ))
   }

   render() {
      const { usersList } = this.props
      const { renderTableHeadingRow, renderUserTableRows } = this

      return (
         <UserListWrapper>
            <Table>
               {renderTableHeadingRow()}
               {renderUserTableRows(usersList)}
            </Table>
         </UserListWrapper>
      )
   }
}

export { UserList }
