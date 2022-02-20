import styled, { ThemeProvider } from "styled-components";
import { DarkTheme } from "./themes/dark";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
import { StrictMode } from "react";
import { Routes, location } from ".";
import { Outlet, Router } from "@tanstack/react-location";
import { rankRoutes } from "@tanstack/react-location-rank-routes";

const client = new QueryClient();

export * from "./router";
export * from "./store";

const Styles = styled.div`
  background-color: ${({ theme }: any) => theme.background.primary};
  min-height: 100vh;
  font-size: 16px;
  padding-inline: 3rem;
`;

export function Root() {
  return (
    <StrictMode>
      <Router routes={Routes} location={location} filterRoutes={rankRoutes}>
        <RecoilRoot>
          <QueryClientProvider client={client}>
            <ThemeProvider theme={DarkTheme}>
              <Styles>
                <Outlet />
              </Styles>
            </ThemeProvider>
          </QueryClientProvider>
        </RecoilRoot>
      </Router>
    </StrictMode>
  );
}
