import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'

import Card from '../../../Common/components/Card'
import {
   CardStatusBar,
   CardStatus,
   Description,
   ProfileWrapper,
   Profile,
   ProfileId,
   Footer,
   Actions,
   Button1,
   Button2,
   MessagePart,
   MessageImg,
   DotsImg
} from './styledComponents'
import './styles.css'

interface CardsListProps {
   cardDetails: Array<any>
}

@observer
class CardsList extends Component<CardsListProps> {
   @observable isHover = false

   render() {
      const { cardDetails } = this.props
      const { isHover } = this

      return (
         <Card className='card-component'>
            <CardStatusBar status={'In Progress'}></CardStatusBar>
            {isHover && (
               <CardStatus status={'In Progress'}>InProgress</CardStatus>
            )}
            <Description>{cardDetails}</Description>
            <ProfileWrapper>
               <Profile src={'url'} alt={'p'} />
               <ProfileId>IBC-633</ProfileId>
            </ProfileWrapper>

            <Footer>
               <Actions>
                  <Button1>Send for Review</Button1>
                  <Button2>Completed</Button2>
               </Actions>
               <MessagePart>
                  <MessageImg src={'url'} alt={'m'} />
                  <DotsImg src={'url'} alt={'d'} />
               </MessagePart>
            </Footer>
         </Card>
      )
   }
}

export default CardsList
