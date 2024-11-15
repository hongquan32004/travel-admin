import { useState } from "react";
import { useRoutes } from "react-router-dom";
import "./App.css";
import Login from "./pages/login";
import MainLayout from "./layouts/main-layout";
import Dashboard from "./pages/dashboard";
import Tour from "./pages/tour";
import Role from "./pages/roles";
import TourDetail from "./pages/tourDetail";
import CreateNew from "./pages/createNew";

function App() {
  const routes = useRoutes([
    {
      path: "login",
      element: <Login />,
    },
    {
      element: <MainLayout />,
      children: [
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/tour",
          element: <Tour />,
        },
        {
          path: "/tour-detail/:tourID",
          element: <TourDetail />,
        },
        {
          path: "/roles",
          element: <Role />,
        },
        {
          path: '/create-new',
          element: <CreateNew />
        }
      ],
    },
  ]);
  return <>{routes}</>;
}

export default App;
