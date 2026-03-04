import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import Workflow from './Workflow.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/primus-pipeline">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/workflow" element={<Workflow />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)