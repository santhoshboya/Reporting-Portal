import React, { Component, ReactNode, ReactNodeArray } from 'react'
import { withTranslation, WithTranslation } from 'react-i18next'

import { Avatar } from '../../../../Common/components/Avatar'
import PopoverMenu from '../../../../Common/components/PopoverMenu'
import { showConfirmDialog } from '../../../../Common/utils/ConfirmationDialogUtils'
import {
   VARIANT,
   AVATAR_TYPE,
   SIZES
} from '../../../../Common/components/Avatar/constants'

import {
   CHAR_LIMIT,
   EMPTY_STRING
} from '../../../Common/constants/stringConstants'
import TeamModel from '../../../stores/models/TeamModel'

import MoreAvatar from '../Avatars/MoreAvatar'
import AddMembersAvatar from '../Avatars/AddMembersAvatar'

import {
   Approvers,
   ApproverAvatars,
   IconContainer,
   MembersCount,
   TeamDescription,
   TeamContainer,
   TeamCardHeader,
   TeamTitleWrapper,
   TeamTitle,
   AvatarContainer,
   ListMenuContainer,
   ListMenuItem,
   AlertMessageTypo
} from './styledComponents'

interface TeamProps extends WithTranslation {
   teamDetails: TeamModel
   onDeleteTeam: (teamId: string) => any
   goToEditTeam: (teamId: string) => void
}

class Team extends Component<TeamProps> {
   getTeamAvatar = (name: string, src: string): ReactNode => (
      <Avatar
         variant={VARIANT.SQUARE}
         avatarType={AVATAR_TYPE.OUTLINE}
         avatarSize={SIZES.MEDIUM}
         altMessage={EMPTY_STRING}
         src={src}
         username={name}
      />
   )

   renderMenuItems = (): ReactNode => {
      const { t, goToEditTeam, onDeleteTeam } = this.props
      const { id } = this.props.teamDetails
      return (
         <ListMenuContainer>
            <ListMenuItem
               key={t('iam:teams.team.edit')}
               onClick={() => goToEditTeam(id)}
            >
               {t('iam:teams.team.edit')}
            </ListMenuItem>
            <ListMenuItem
               key={t('iam:teams.team.delete')}
               onClick={() =>
                  showConfirmDialog({
                     MessageTypo: AlertMessageTypo,
                     message: t('iam:teams.team.alertMessage'),
                     onConfirm: () => onDeleteTeam(id)
                  })
               }
            >
               {t('iam:teams.team.delete')}
            </ListMenuItem>
         </ListMenuContainer>
      )
   }

   // NOTE: we can add link to  the more dots
   getDescription = (): string => {
      const { t } = this.props
      const { description } = this.props.teamDetails
      if (description.length > CHAR_LIMIT) {
         return description.substring(0, CHAR_LIMIT) + t('iam:teams.dots')
      }
      return description
   }

   getMemberAvatars = (): ReactNodeArray => {
      const { membersList } = this.props.teamDetails
      let avatarLimit = 6
      if (membersList.length < 6) {
         avatarLimit = membersList.length
      }
      const avatarsList = membersList.slice(0, avatarLimit).map(member => (
         <AvatarContainer key={member.member_id}>
            <Avatar
               variant={VARIANT.CIRCLE}
               avatarType={AVATAR_TYPE.FILLED}
               avatarSize={SIZES.EXTRA_SMALL}
               altMessage={member.name}
               src={member.profile_pic_url}
               username={member.name}
            />
         </AvatarContainer>
      ))
      if (membersList.length > avatarLimit) {
         avatarsList.push(
            <MoreAvatar
               key={membersList[avatarLimit].member_id}
               noOfremainingAvatars={membersList.length - avatarLimit}
            />
         )
      }
      return avatarsList
   }

   render() {
      const { t } = this.props
      const { name, noOfMembers } = this.props.teamDetails

      return (
         <TeamContainer>
            <TeamCardHeader>
               <TeamTitleWrapper>
                  {this.getTeamAvatar(name, EMPTY_STRING)}
                  <TeamTitle>{name}</TeamTitle>
               </TeamTitleWrapper>
               <IconContainer>
                  <PopoverMenu renderPopoverContent={this.renderMenuItems()} />
               </IconContainer>
            </TeamCardHeader>
            <TeamDescription>{this.getDescription()}</TeamDescription>
            <MembersCount>
               {t('iam:teams.members', { count: noOfMembers })}
            </MembersCount>
            <Approvers>{t('iam:teams.approvers')}</Approvers>
            <ApproverAvatars>
               {this.getMemberAvatars()}
               <AddMembersAvatar />
            </ApproverAvatars>
         </TeamContainer>
      )
   }
}

export default withTranslation()(Team)
