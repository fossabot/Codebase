import { Row, Text, Title } from "@projects/libs/movie/core-ui";
import {
  getMovieFromId,
  getMoviePreview,
} from "@projects/libs/movie/data-access";
import { useMatch } from "@tanstack/react-location";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { MovieLayout } from "../../../layouts/movie/movie";

/* eslint-disable-next-line */
export interface MovieProps {}

const Container = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.background.secondary};
  border-radius: 5px;
  gap: 1rem;
`;

const MainContainer = styled(Row)`
  display: grid;
  max-width: 100%;
  gap: 1rem;
  grid-template-columns: 100%;
`;

const HeaderContainer = styled(Container)``;
const ReviewContainer = styled(Container)``;
const PreviewContainer = styled(Container)``;

const Preview = styled.iframe`
  width: min(100%, 560px);
  aspect-ratio: 16 / 9;
`;

const CommentsContainer = styled(Container)`
  padding: 2rem;
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const LeftCommentHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1.5rem;
  flex-wrap: wrap;
`;

export function GroupMovie(props: MovieProps) {
  const { params } = useMatch();

  const [movie, setMovie] = useState({
    title: "",
    overview: "",
    poster_path: "",
  });

  const [preview, setPreview] = useState<any>(null);

  useEffect(() => {
    async function main() {
      const [movie, error] = await getMovieFromId(
        params["movieId"],
        params["id"]
      );
      setMovie(movie);
      const [previewdb] = await getMoviePreview(movie.movie_id, params["id"]);
      setPreview(previewdb);
    }
    main();
  }, [params]);

  return (
    <MovieLayout poster={movie?.poster_path} title={movie.title}>
      <MainContainer gap="2">
        <HeaderContainer>
          <Title>{movie?.title}</Title>
          <Text>{movie?.overview}</Text>
        </HeaderContainer>
        <PreviewContainer>
          {preview?.results[0]?.key !== undefined ? (
            <Preview
              width="100%"
              height="315"
              src={`https://www.youtube.com/embed/${preview?.results[0]?.key}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <Text>This movie does not have a trailer</Text>
          )}
        </PreviewContainer>
      </MainContainer>
    </MovieLayout>
  );
}
