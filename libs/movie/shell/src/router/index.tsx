import {
  ReactLocation,
  createHashHistory,
  Route,
} from "@tanstack/react-location";
import { MoviePublicFeatureRoutes } from "@projects/libs/movie/feature-public";
import { MovieAppFeatureRoutes } from "@projects/libs/movie/feature-app";
export const location = new ReactLocation({ history: createHashHistory() });

export const Routes: Route[] = [
  {
    path: "app",
    children: MovieAppFeatureRoutes,
  },
  {
    path: "",
    children: MoviePublicFeatureRoutes,
  },
];
