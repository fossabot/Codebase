import { Card, Title } from "@projects/libs/movie/core-ui";
import { useNavigate } from "@tanstack/react-location";
import styled from "styled-components";

/* eslint-disable-next-line */
export interface MovieCardProps {
  movie: unknown;
}

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.25rem;
`;

const Container = styled(Card)`
  display: grid;
  grid-template-rows: auto 1fr;
  border-radius: 0.25rem;
`;

const LowerContainer = styled.div`
  padding: 0.75rem;
`;

export function MovieCard({ movie }: MovieCardProps) {
  const backgroundURL = `https://image.tmdb.org/t/p/w200/${
    (movie as any).backdrop_path
  }`;

  const router = useNavigate();

  const gotoMovie = () => {
    router({ to: (movie as any).id });
  };

  return (
    <Container onClick={gotoMovie}>
      <Image src={backgroundURL} alt="" />
      <LowerContainer>
        <Title size="1.5">{(movie as any).title}</Title>
      </LowerContainer>
    </Container>
  );
}

export default MovieCard;
