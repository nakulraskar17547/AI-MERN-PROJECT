import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import useGetCurrentUser from './hooks/useGetCurrentUser'
import { useSelector } from 'react-redux'
import Dashboard from './pages/Dashboard'
import Generate from './pages/Generate'
import WebsiteEditor from './pages/Editor'
import Livesite from './pages/Livesite'
import Pricing from './pages/Pricing'
import PaymentSuccess from './pages/PaymentSuccess'
export const serverUrl="http://localhost:8000"
 function App() {
  useGetCurrentUser()
  const {userData}=useSelector(state=>state.user)
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/dashboard' element={userData?<Dashboard/>:<Home/>}/>
      <Route path='/generate' element={userData?<Generate/>:<Home/>}/>
      <Route path='/editor/:id' element={userData?<WebsiteEditor/>:<Home/>}/>
      <Route path='/site/:id' element={<Livesite/>}/>
      <Route path='/pricing' element={<Pricing/>}/>
      <Route path='/payment-success' element={userData?<PaymentSuccess/>:<Home/>}/>

    </Routes>
    </BrowserRouter>
  )
}

export default App

