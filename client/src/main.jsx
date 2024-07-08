import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import UserProvider from './UserProvider.jsx'
import EnumsProvider from './components/EnumsProvider.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <EnumsProvider>
      <UserProvider>
        <App />
      </UserProvider>
      </EnumsProvider>
  </React.StrictMode>,
)
