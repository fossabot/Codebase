import { Navigate, Route } from "react-location";
// import Home from "./lib/home/home";
// import Pricing from "./lib/pricing/pricing";

export const MovieAppFeatureRoutes: Route[] = [
  {
    path: "testing",
    element: <h1>hello</h1>,
  },
  {
    path: "/",
    element: <Navigate to="/testing" />,
  },
  // {
  //   path: "home",
  //   element: <Home />,
  // },
  // {
  //   path: "pricing",
  //   element: <Pricing />,
  // },
  // {
  //   path: "/",
  //   element: <Navigate to="home" />,
  // },
];
