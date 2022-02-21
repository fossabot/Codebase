import styled from "styled-components";
import { Navbar } from "../../components/home-navbar/home-navbar";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  addMovieToGroup,
  getGroupFromId,
  getMovieRecommendations,
} from "@projects/libs/movie/data-access";
import { useMatch } from "@tanstack/react-location";
import MovieSearchCard from "../../components/movie-search-card/movie-search-card";

/* eslint-disable-next-line */
export interface SearchProps {}

const Grid = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export function MovieSearch(props: SearchProps) {
  const { params } = useMatch();

  const [group, setGroup] = useState();
  const [movies, setMovies] = useState<any>();

  useEffect(() => {
    async function main() {
      const groupFromId = await getGroupFromId(params["id"]);
      setGroup(groupFromId);

      const [recommendations] = await getMovieRecommendations(params["id"]);
      setMovies(recommendations);
    }
    main();
  }, [params]);

  const addMovie = (index: number) => {
    const movie = movies.results[index];

    addMovieToGroup(movie, params["id"]);
  };

  return (
    <>
      <Navbar group={group} />
      <Grid>
        {movies?.results?.map((movie: any, index: number) => (
          <MovieSearchCard
            key={index}
            movie={movie}
            onAdd={() => addMovie(index)}
          />
        ))}
      </Grid>
    </>
  );
}
