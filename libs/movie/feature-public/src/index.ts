import { Navigate, Route } from "@tanstack/react-location";
import { createElement } from "react";
import Home from "./lib/home/home";
import Pricing from "./lib/pricing/pricing";

export const MoviePublicFeatureRoutes: Route[] = [
  {
    path: "home",
    element: createElement(Home, {}, null),
  },
  {
    path: "pricing",
    element: createElement(Pricing, {}, null),
  },

  {
    path: "/",
    element: createElement(Navigate, { to: "/home" }, null),
  },
];
