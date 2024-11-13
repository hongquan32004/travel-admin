import { useState } from 'react'
import { useRoutes } from 'react-router-dom';
import './App.css'
import Login from './pages/login';
import MainLayout from './layouts/main-layout';
import Dashboard from './pages/dashboard';
import Tour from './pages/tour';

function App() {

  const routes = useRoutes([
    {
      path: 'login',
      element: <Login />
    },
    {
      element: <MainLayout />,
      children: [
        {
          path: '/dashboard',
          element: <Dashboard />
        },
        {
          path: '/tour',
          element: <Tour />
        }
      ]
    }
  ])
  return (
    <>
      {routes}
    </>
  )
}

export default App
