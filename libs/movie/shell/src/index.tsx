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
  background-color: ${({
    theme,
  }: {
    theme: { background: { primary: string } };
  }) => theme.background.primary};
  min-height: 100vh;
  font-size: 16px;
  * {
    box-sizing: border-box;
  }
  padding: 0;
  margin: 0;
`;

export function Root() {
  return (
    <StrictMode>
      <Router
        routes={Routes as any}
        location={location}
        filterRoutes={rankRoutes}
      >
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
