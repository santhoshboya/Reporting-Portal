import styled from 'styled-components'
import colors from '../../../Common/themes/Colors'

//TODO:change status and colors  and typos
const CardStatusBar = styled.p`
   height: 4px;
   background-color: ${props =>
      props.status === 'In Progress'
         ? '#4c63b6'
         : props.status === 'Verification'
         ? '#de911d'
         : props.status === 'Todo'
         ? '#e4e7eb'
         : '#c42d78'};
`
const CardStatus = styled.p`
   padding: 10px 0px 10px 0px;
   background-color: ${props =>
      props.status === 'In Progress'
         ? '#e0e8f9'
         : props.status === 'Verification'
         ? '#fffbea'
         : props.status === 'Todo'
         ? '#7b8676'
         : '#c42f00'};
`

const Description = styled.p`
   margin: 15px;
   font-size: 14px;
`

const ProfileWrapper = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
   margin: 5px 15px;
`

const Profile = styled.img`
   border-radius: 50%;
`

const ProfileId = styled.p`
   background-color: rgba(9, 103, 210, 0.08);
   color: #0967d2;
   padding: 5px 10px;
   font-size: 12px;
`
const Footer = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
   margin: 15px;
`
const Actions = styled.div`
   display: flex;
`

const Button1 = styled.button`
   font-size: 10px;
   padding: 8px 5px;
`

const Button2 = styled.button`
   font-size: 10px;
   padding: 8px 5px;
`

const MessagePart = styled.div`
   display: flex;
`

const MessageImg = styled.img`
   border-radius: 50%;
   margin: 8px 5px;
`

const DotsImg = styled.img`
   border-radius: 50%;
   margin: 8px 5px;
`
export {
   ProfileWrapper,
   Profile,
   Description,
   CardStatus,
   CardStatusBar,
   ProfileId,
   Footer,
   Actions,
   Button1,
   Button2,
   MessagePart,
   MessageImg,
   DotsImg
}
