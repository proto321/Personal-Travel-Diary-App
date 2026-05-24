// rafce
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>

      {/* Protected Route */}
      <Route element={<PrivateRoute />}>
        <Route path='/' element={<Home />} /> 
      </Route>

         {/* Public Routes */}
        <Route path='/login' element={<Login />} />
        <Route path='/sign-up' element={<SignUp />} />

      </Routes>
      </BrowserRouter>
    </>

  )
}

export default App