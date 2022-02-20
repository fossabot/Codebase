import { Navigate, Route } from "@tanstack/react-location";
import { Main } from "./layouts/main/main";
import { GroupHome } from "./group/routes/home/home";
import { GroupMovie } from "./group/routes/movie/movie";
import { MovieSearch } from "./group/routes/search/search";
import CreateGroup from "./groups/routes/create/group";
import { GroupsHome } from "./groups/routes/home/home";
import { createElement } from "react";

export const MovieAppFeatureRoutes: Route[] = [
  {
    element: createElement(Main),
    children: [
      {
        path: "groups",
        element: createElement(GroupsHome),
      },
      {
        path: "group/:id",
        children: [
          {
            path: "search",
            element: createElement(MovieSearch),
          },
          {
            path: "m",
            element: createElement(GroupHome),
          },
          {
            path: "m/:movieId",
            element: createElement(GroupMovie),
          },
          {
            path: "/",
            element: createElement(Navigate, { to: "m", replace: true }),
          },
        ],
      },
      {
        path: "/",
        element: createElement(Navigate, { to: "/app/groups" }),
      },
      {
        path: "create",
        element: createElement(CreateGroup),
      },
      {
        path: "group",
        element: createElement(Navigate, { to: "/app/groups" }),
      },
    ],
  },
];
