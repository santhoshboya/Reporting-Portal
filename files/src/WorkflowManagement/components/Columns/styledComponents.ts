import styled from 'styled-components'
import tw from 'twin.macro'

export const ColumnsContainer = styled.div`
   ${tw`
      flex items-stretch justify-around flex-grow mt-25px box-border  
    `};
`
export const NoDataContainer = styled.div``

export const loadingWrapperStyles = {
   display: 'flex',
   flexGrow: 1,
   justifyContent: 'center'
}
