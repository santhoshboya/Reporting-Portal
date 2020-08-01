import React, { Suspense } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { I18nextProvider } from 'react-i18next'
import { Provider } from 'mobx-react'

import LoadingView from '../../components/LoadingWrapper/LoadingView'

import i18n from '../../i18n'

import stores from '../../stores/index'

import Routes from '../index'

import './App.css'

const App: React.FC = () => (
   <Suspense
      fallback={
         <div className='suspense-loading-view'>
            <LoadingView />
         </div>
      }
   >
      <Provider {...stores}>
         <I18nextProvider i18n={i18n}>
            <Routes />
            <ToastContainer
               position='top-right'
               autoClose={1000}
               hideProgressBar={true}
               newestOnTop={true}
               closeOnClick
               rtl={false}
               draggable
               pauseOnHover
            />
         </I18nextProvider>
      </Provider>
   </Suspense>
)

export default App
