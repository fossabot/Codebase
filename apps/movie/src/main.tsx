import { StrictMode } from "react";
import * as ReactDOM from "react-dom";
import { location, Root, Routes } from "@projects/libs/movie/shell";
import "./globals.css";
import { Router, Outlet } from "react-location";

ReactDOM.render(
  <StrictMode>
    <Router routes={Routes} location={location}>
      <Root>
        <Outlet />
      </Root>
    </Router>
  </StrictMode>,
  document.getElementById("root")
);
