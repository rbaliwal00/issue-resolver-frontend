import React from 'react'
import ReactDOM from 'react-dom/client';
import App from './App'
import { Provider } from 'react-redux'
import './index.css'
import {store} from './redux/app/store';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}><Provider store={store}><App/></Provider></QueryClientProvider>
  </React.StrictMode>,
)
