import { useRoutes } from "react-router-dom";
import "./App.css";
import Login from "./pages/login";
import MainLayout from "./layouts/main-layout";
import Dashboard from "./pages/dashboard";
import Tour from "./pages/tour";
import Role from "./pages/roles";
import TourDetail from "./pages/tourDetail";
import CreateNew from "./pages/createNew";
import Category from "./pages/category";
import Destination from "./pages/destination";
import Departure from "./pages/departure";
import Order from "./pages/order";
import Transportation from "./pages/transportation";
import Permissions from "./pages/permissions";
import Account from "./pages/account";
import PrivateRoute from "./components/privateRoute";
import EditTour from "./pages/editTour/";
import { useSelector } from "react-redux";

function App() {
  const permissions = useSelector((state) => state.permissions.list);

  const isViewTour = permissions.includes("READ_TOUR");
  const isViewCategory = permissions.includes("READ_CATEGORY");
  const isViewDestination = permissions.includes("READ_DESTINATION");
  const isViewDeparture = permissions.includes("READ_DEPARTURE");
  const isViewTransportation = permissions.includes("READ_TRANSPORTATION");
  const isViewOrder = permissions.includes("READ_ORDER");
  const isViewRole = permissions.includes("READ_ROLES");
  const isViewPermission = permissions.includes("READ_PERMISSIONS");
  const isViewAccount = permissions.includes("READ_TOUR");

  console.log(isViewTour, isViewCategory);

  const routes = useRoutes([
    {
      path: "login",
      element: <Login />,
    },
    {
      element: <PrivateRoute />,
      children: [
        {
          element: <MainLayout />,
          children: [
            {
              path: "/dashboard",
              element: <Dashboard />,
            },
            {
              path: "/tour",
              element: isViewTour ? <Tour /> : <Dashboard />,
            },
            {
              path: "/categories",
              element: isViewCategory ? <Category /> : <Dashboard />,
            },
            {
              path: "/departures",
              element: isViewDeparture ? <Departure /> : <Dashboard />,
            },
            {
              path: "/destinations",
              element: isViewDestination ? <Destination /> : <Dashboard />,
            },
            {
              path: "/transportations",
              element: isViewTransportation ? (
                <Transportation />
              ) : (
                <Dashboard />
              ),
            },
            {
              path: "/orders",
              element: isViewOrder ? <Order /> : <Dashboard />,
            },
            {
              path: "/roles",
              element: isViewRole ? <Role /> : <Dashboard />,
            },
            {
              path: "/permissions",
              element: isViewPermission ? <Permissions /> : <Dashboard />,
            },
            {
              path: "/accounts",
              element: isViewAccount ? <Account /> : <Dashboard />,
            },
            {
              path: "/tour-detail/:tourID",
              element: <TourDetail />,
            },
            {
              path: "/create-new",
              element: <CreateNew />,
            },
            {
              path: "/edit-tour/:tourId",
              element: <EditTour />,
            },
          ],
        },
      ],
    },
  ]);
  return <>{routes}</>;
}

export default App;
