import tw, { styled, css } from 'twin.macro'

import { TextFontLabelBasic700 } from '../../../Common/styleGuide/Typos'

export const TasksListContainer = styled.div`
   ${tw`flex-col items-center justify-center mt-16px rounded-4px`};
`

export const Table = styled.div`
   ${tw`border-solid border-0 border-l-default border-r-default border-t-default border-basic300 table-fixed w-full rounded-4px bg-white`}
`

export const TableBody = styled.div``

export const TableHeader = styled.div`
   ${tw`flex items-center border-0 border-b-default border-solid border-basic300 pr-8px`};
`

export const TableHeadingContainer = styled.div`
   ${tw`text-justify flex-grow align-middle h-56px  px-32px py-16px box-border`};
   flex-basis: 0px;
`

export const TableHeading = styled(TextFontLabelBasic700)`
   ${tw`leading-1.33 tracking-0.4px uppercase`}
`

export const paginationContainerCSS = css`
   ${tw`mt-16px`}
`
export const NoDataViewContainer = styled.div`
   ${tw`w-full flex justify-center items-center h-208px border-solid border-basic800 border-default rounded-4px mt-16px`}
`

export const IconContainer = styled.div`
   ${tw`w-20px h-20px flex items-center justify-center mr-16px cursor-pointer `}
`
