import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import Router from './Router'
import { RecoilRoot } from 'recoil'
import { APIProvider } from '@vis.gl/react-google-maps'
import './i18n'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RecoilRoot>
      <APIProvider apiKey={process.env.GOOGLE_MAPS_API_KEY as string}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </APIProvider>
    </RecoilRoot>
  </React.StrictMode>
)
