import styled from 'styled-components'
import {AiFillStar} from 'react-icons/ai'

export const StarIcon = styled.p`
  margin-right: 5px;
`

export const ItemContainer = styled.div`
  display: flex;
`
export const IconItem = styled(AiFillStar)`
  color: ${props => props.color};
`
