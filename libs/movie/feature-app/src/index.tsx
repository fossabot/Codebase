import { Navigate, Route } from "@tanstack/react-location";
import { GroupHome } from "./group/routes/home/home";
import { GroupMovie } from "./group/routes/movie/movie";
import { MovieSearch } from "./group/routes/search/search";
import CreateGroup from "./groups/routes/create/group";
import { GroupsHome } from "./groups/routes/home/home";

export const MovieAppFeatureRoutes: Route[] = [
  {
    path: "groups",
    element: <GroupsHome />,
  },
  {
    path: "group/:id",
    children: [
      {
        path: "search",
        element: <MovieSearch />,
      },
      {
        path: "m",
        element: <GroupHome />,
      },
      {
        path: "m/:movieId",
        element: <GroupMovie />,
      },
      {
        path: "/",
        element: <Navigate to="m" replace={true} />,
      },
    ],
  },
  {
    path: "/",
    element: <Navigate to="/app/groups" />,
  },
  {
    path: "create",
    element: <CreateGroup />,
  },
  { path: "group", element: <Navigate to="/app/groups" /> },
];
