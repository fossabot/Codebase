import styled, { ThemeProvider } from "styled-components";
import { DarkTheme } from "./themes/dark";
// import { LightTheme } from "./themes/light";
import { RecoilRoot } from "recoil";

export * from "./router";
export * from "./store";

const Styles = styled.div`
  background-color: ${({ theme }: any) => theme.background.primary};
  min-height: 100vh;
  font-size: 16px;
`;

interface RootProps {
  children: any;
}

export function Root({ children }: RootProps) {
  return (
    <RecoilRoot>
      <ThemeProvider theme={DarkTheme}>
        <Styles>{children}</Styles>
      </ThemeProvider>
    </RecoilRoot>
  );
}
