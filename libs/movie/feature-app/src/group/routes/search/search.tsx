import styled from "styled-components";
import { Navbar } from "../../components/home-navbar/home-navbar";

import { useEffect, useState } from "react";
import {
  getAllMovies,
  getGroupFromId,
  getMovieRecommendations,
} from "@projects/libs/movie/data-access";
import { useMatch } from "@tanstack/react-location";
import { ConsoleLogger } from "@nestjs/common";
import { Text } from "@projects/libs/movie/core-ui";

/* eslint-disable-next-line */
export interface SearchProps {}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  justify-content: space-between;
`;

export function MovieSearch(props: SearchProps) {
  const { params } = useMatch();

  const [group, setGroup] = useState();
  const [movies, setMovies] = useState<any[]>();

  useEffect(() => {
    async function main() {
      const groupFromId = await getGroupFromId(params["id"]);
      setGroup(groupFromId);

      const recommendations = await getMovieRecommendations(params["id"]);
      setMovies(recommendations);
    }
    main();
  }, [params]);

  return (
    <>
      <Navbar group={group} />
      {JSON.stringify(movies)}
    </>
  );
}
