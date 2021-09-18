import React from 'react'

import AddIcon from '../../../../Common/icons/AddIcon'

import { AddTeamOrCompanyCardContainer, Caption } from './styledComponents'

interface AddTeamOrCompanyCardProps {
   onClickCard: () => void
   label: string
}

const AddTeamOrCompanyCard = (props: AddTeamOrCompanyCardProps) => {
   const { onClickCard, label } = props
   return (
      <AddTeamOrCompanyCardContainer onClick={onClickCard}>
         <AddIcon />
         <Caption>{label}</Caption>
      </AddTeamOrCompanyCardContainer>
   )
}
export default AddTeamOrCompanyCard
