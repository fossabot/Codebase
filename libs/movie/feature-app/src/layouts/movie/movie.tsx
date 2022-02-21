import { Button, Link } from "@projects/libs/movie/core-ui";

import { useNavigate } from "@tanstack/react-location";
import { ReactNode, useState } from "react";
import styled from "styled-components";
import { animateScroll } from "react-scroll";
import { MovieNavbar } from "../../group/components/movie-navbar/movie-navbar";

/* eslint-disable-next-line */
export interface MovieProps {
  // children: unkown;
  children: ReactNode;
  poster: string;
  title: string;
}

const MainContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  padding-bottom: 0px;
  gap: 2rem;

  @media screen and (max-width: 960px) {
    display: flex;
  }
  @media screen and (max-width: 500px) {
    padding-inline: 1rem;
  }
  min-height: 100%;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;

  position: relative;
  top: 0;

  background-color: ${({ theme }) => theme.background.secondary};
  padding: 3rem;
  @media screen and (max-width: 960px) {
    padding: 0;
    margin: 0;
    background-color: unset;
  }
`;
const MoviePod = styled.div`
  top: 3rem;
  position: sticky;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  @media screen and (max-width: 960px) {
    align-items: center;
    position: static;
    max-width: 100%;
  }
`;
const InfoPod = styled.div`
  background: ${({ theme }) => theme.background.third};
  padding: 1rem;
  width: 300px;
  border-radius: 5px;
  display: grid;

  grid-template-columns: 1fr;

  @media screen and (max-width: 960px) {
    display: none;
  }
`;

const View = styled.div`
  max-width: 100%;
`;

const Poster = styled.img`
  border-radius: 10px;
  width: 100%;

  @media screen and (max-width: 960px) {
    width: 40%;
    min-width: 250px;
  }
`;

export function MovieLayout({ children, poster, title }: MovieProps) {
  const router = useNavigate();

  const toBack = () => router({ to: "../.." });

  const toTop = animateScroll.scrollToTop;

  const toBottom = () => animateScroll.scrollTo(window.innerHeight);
  return (
    <>
      <MovieNavbar
        buttons={
          <Button variant="outlined" onClick={toBack}>
            Go Back
          </Button>
        }
        title={title}
      />
      <MainContainer>
        <LeftContainer>
          <MoviePod>
            <Poster src={`https://image.tmdb.org/t/p/w300${poster}`} alt="" />
            <InfoPod>
              <Link onClick={toTop}>Go to top</Link>
              <Link onClick={toBottom}>Go to bottom</Link>
            </InfoPod>
          </MoviePod>
        </LeftContainer>
        <View>{children}</View>
      </MainContainer>
    </>
  );
}
