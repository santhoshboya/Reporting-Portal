import React from 'react'
import '../../../styles/tailwind.css'
import {Pagination} from './Pagination'
import { action } from "@storybook/addon-actions"
export default {
    component:Pagination,
    title:'Ecommers/Pagination'
}

export const paginationDefault= () => <Pagination currentPage={1} nextPage={6}/>
export const pagination= () => <Pagination 
        currentPage={1}
         nextPage={6}
         goToPreviousPage={action('previous')}
         goToNextPage={action('nextpage')}
         />