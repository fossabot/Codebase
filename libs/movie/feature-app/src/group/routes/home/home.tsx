import { getGroupFromId } from "@projects/libs/movie/data-access";
import { useEffect, useState } from "react";
import { useMatches } from "@tanstack/react-location";
import styled from "styled-components";
import Navbar from "../../components/home-navbar/home-navbar";
import MovieCard from "../../components/movie-card/movie-card";

/* eslint-disable-next-line */
export interface HomeProps {}

const StyledHome = styled.div`
  color: pink;
`;

export function GroupHome(props: HomeProps) {
  const [
    {
      params: { id },
    },
  ] = useMatches();

  const [group, setGroup] = useState();
  const [movies, setMovies] = useState();

  useEffect(() => {
    async function main() {
      const group = await getGroupFromId(id);
      setMovies(group.movie);

      delete group.movie;
      setGroup(group);
    }
    main();
  }, [id]);

  return (
    <StyledHome>
      <Navbar group={group} />
      {JSON.stringify(group)} <br></br>
      {(movies || []).map((movie: any, index: number) => (
        <MovieCard movie={movie} key={index}/>
      ))}
    </StyledHome>
  );
}
