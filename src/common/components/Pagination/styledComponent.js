import styled from '@emotion/styled'
import tw from 'tailwind.macro'
const PaginationBtnDiv = styled.div`${tw`flex justify-end items-center`}
margin-top:24px`
const CurrentPage = styled.button`${tw`border border-black w-8 h-8 flex justify-center items-center`}
margin:5px`
const Seperator = styled.div`${tw`mx-2`}`
const NextPage = styled.p`${tw`w-8 h-8 flex justify-center items-center`}`
export { PaginationBtnDiv, CurrentPage, Seperator, NextPage }