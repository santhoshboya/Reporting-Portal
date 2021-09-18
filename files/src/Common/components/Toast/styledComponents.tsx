import styled from 'styled-components'

const ToasterWrapper = styled('div')`
   display: flex;
   align-items: center;
`

const ToastTitle = styled('p')`
   font-size: 18px;
`

const ToastMessage = styled('p')``

const ToastMessageWrapper = styled('div')`
   margin-left: 10px;
   display: flex;
   flex-direction: column;
`

export { ToasterWrapper, ToastTitle, ToastMessage, ToastMessageWrapper }
