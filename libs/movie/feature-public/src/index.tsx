import { Navigate, Route } from "react-location";
import Home from "./lib/home/home";
import Pricing from "./lib/pricing/pricing";

export const MoviePublicFeatureRoutes: Route[] = [
  {
    path: "home",
    element: <Home />,
  },
  {
    path: "pricing",
    element: <Pricing />,
  },
  {
    path: "/",
    element: <Navigate to="home" />,
  },
];
