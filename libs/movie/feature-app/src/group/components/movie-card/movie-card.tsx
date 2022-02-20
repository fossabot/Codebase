import styled from "styled-components";

/* eslint-disable-next-line */
export interface MovieCardProps {
  movie: any;
}

// const StyledMovieCard = styled.div`
//   color: pink;
// `;

export function MovieCard({ movie }: MovieCardProps) {
  return <>{JSON.stringify(movie)}</>;
}

export default MovieCard;
