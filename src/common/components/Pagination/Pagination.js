import React, { Component } from 'react'
import { PaginationButton } from '../PaginationButton'
import { PaginationBtnDiv, CurrentPage } from './styledComponent'

import './index.css'
const COUNT = 5
class Pagination extends Component {
   goToRandomPage = event => {
      this.props.goToRandomPage(event.target.value)
   }

   getPageButtons = (currentPage, totalPages) => {
      if (totalPages < 5) {
         let arrayOfPages = Array.from({ length: totalPages }, (v, i) => i + 1)
         return arrayOfPages.map(page => (
            <CurrentPage
               key={Math.random()}
               className={
                  page === currentPage
                     ? 'pagination-button-highlight'
                     : 'pagination-button'
               }
               onClick={this.goToRandomPage}
               value={page}
            >
               {page}
            </CurrentPage>
         ))
      } else if (currentPage < totalPages - 4) {
         let arrayOfPages = []
         arrayOfPages.push(
            <CurrentPage
               className={'pagination-button-highlight'}
               key={Math.random()}
               onClick={this.goToRandomPage}
               value={currentPage}
            >
               {currentPage}
            </CurrentPage>
         )
         arrayOfPages.push(
            <CurrentPage
               className={'pagination-button'}
               key={Math.random()}
               onClick={this.goToRandomPage}
               value={currentPage + 1}
            >
               {currentPage + 1}
            </CurrentPage>
         )
         arrayOfPages.push(
            <CurrentPage
               className={'pagination-button'}
               key={Math.random()}
               onClick={this.goToRandomPage}
               value={(totalPages + currentPage) / 2}
            >
               ...
            </CurrentPage>
         )
         arrayOfPages.push(
            <CurrentPage
               className={'pagination-button'}
               key={Math.random()}
               onClick={this.goToRandomPage}
               value={totalPages - 1}
            >
               {totalPages - 1}
            </CurrentPage>
         )
         arrayOfPages.push(
            <CurrentPage
               className={'pagination-button'}
               key={Math.random()}
               onClick={this.goToRandomPage}
               value={totalPages}
            >
               {totalPages}
            </CurrentPage>
         )
         return arrayOfPages
      } else {
         let arrayOfPages = Array.from(
            { length: COUNT },
            (v, i) => totalPages - COUNT + i + 1
         )
         return arrayOfPages.map(page => (
            <CurrentPage
               className={
                  page === currentPage
                     ? 'pagination-button-highlight'
                     : 'pagination-button'
               }
               key={Math.random()}
               onClick={this.goToRandomPage}
               value={page}
            >
               {page}
            </CurrentPage>
         ))
      }
   }

   render() {
      const {
         currentPage,
         totalPages,
         goToPreviousPage,
         goToNextPage,
         goToRandomPage
      } = this.props
      const butttons = this.getPageButtons(currentPage, totalPages)
      return (
         <PaginationBtnDiv>
            <PaginationButton
               isDisable={currentPage > 1 ? false : true}
               changePage={goToPreviousPage}
               svg={
                  'https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/24ef7d49-46b3-47e6-b835-579ee7a857d0.svg'
               }
            />
            {butttons.map(button => button)}
            <PaginationButton
               isDisable={currentPage < totalPages ? false : true}
               changePage={goToNextPage}
               svg={
                  'https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/8c3c6b47-f12f-4a74-9a04-5790a1970543.svg'
               }
            />
         </PaginationBtnDiv>
      )
   }
}

export { Pagination }
