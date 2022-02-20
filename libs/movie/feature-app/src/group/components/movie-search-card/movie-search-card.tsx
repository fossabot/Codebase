import { Button, Card, Text, Title } from "@projects/libs/movie/core-ui";
import styled from "styled-components";

/* eslint-disable-next-line */
export interface MovieSearchCardProps {
  movie: unkown;
  onAdd: () => void;
}

const SMovieSearchCard = styled(Card)`
  display: flex;

  flex-direction: row;
`;

const Image = styled.img`
  width: 200px;
  height: 300px;
`;

const Container = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const BtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
  margin-top: auto;
`;

export function MovieSearchCard({ movie, onAdd }: MovieSearchCardProps) {
  const poster = `https://image.tmdb.org/t/p/w200/${movie.poster_path}`;

  return (
    <SMovieSearchCard>
      <Image src={poster} alt="" />
      <Container>
        <Title>{movie.title}</Title>
        <Text>{movie.overview}</Text>
        <BtnContainer>
          <Button variant="text" onClick={onAdd}>
            Add To group
          </Button>
        </BtnContainer>
      </Container>
    </SMovieSearchCard>
  );
}

export default MovieSearchCard;
