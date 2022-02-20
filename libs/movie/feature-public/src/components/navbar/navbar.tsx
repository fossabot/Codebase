import styled from "styled-components";

import { Button, Link, Title } from "@projects/libs/movie/core-ui";
import { useEffect, useState } from "react";
import { SignUpButton } from "../sign-up-button/sign-up-button";
import { SignInButton } from "../sign-in-button/sign-in-button";
import { checkAuth } from "@projects/libs/movie/data-access";
import { useNavigate } from "@tanstack/react-location";
// import {} from "@projects/libs/movie/data-access"
import { motion } from "framer-motion";

/* eslint-disable-next-line */
export interface NavbarProps {}

const StyledNavbar = styled(motion.div)`
  padding: 2rem 2rem;
  display: flex;
  justify-content: space-between;
`;

const NavLinks = styled(motion.nav)`
  display: flex;
  gap: 3rem;
  align-items: center;
  font-size: 1.05rem !important;
`;

const NavLink = styled(Link)`
  font-size: 1.05rem;
  margin-bottom: 0.1rem;
`;

const NavbarAni = {
  initial: { opacity: 0, y: -10 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

export function Navbar(props: NavbarProps) {
  const router = useNavigate();
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    async function main() {
      setIsAuthed(await checkAuth());
    }
    main();
  }, []);

  return (
    <StyledNavbar>
      <Title
        size="1.8"
        variants={NavbarAni}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        Movie Reviewer
      </Title>
      <NavLinks
        variants={NavbarAni}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/pricing">Pricing</NavLink>
        {isAuthed ? (
          <Button onClick={() => router({ to: "/app" })}>To lobby</Button>
        ) : (
          <>
            <SignInButton onSignUp={() => console.log("tesing")} />
            <SignUpButton onSignIn={() => console.log("tesing")} />
          </>
        )}
      </NavLinks>
    </StyledNavbar>
  );
}

export default Navbar;
