import { render } from "@testing-library/react";

import Modal from "./modal";
import { ThemeProvider } from "styled-components";

const DarkTheme = {
  theme: "dark",
  text: {
    primary: "hsl(0, 0%, 90%)",
    secondary: "rgb(190, 190, 190)",
    third: "rgb(140,140,140)",
  },
  color: {
    primary: "rgb(144, 202, 249)",
    primaryHover: "rgb(170, 220,255)",

    secondary: "rgba(150, 220, 240)",
    secondaryHover: "rgba(144, 202, 249, 0.1)",
  },
  background: {
    primary: "rgb(24, 24, 24)",
    secondary: "rgba(35, 35, 35, 0.7)",
    third: "rgba(90, 90, 90, 0.3)",
    modal: "rgba(0, 0, 0, 0.7)",
  },
};
describe("Modal", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <ThemeProvider theme={DarkTheme}>
        <Modal isOpen={true} />
      </ThemeProvider>
    );
    expect(baseElement).toBeTruthy();
  });

  it("should not render", () => {
    const { baseElement } = render(<Modal isOpen={false} />);
    expect(baseElement.firstChild?.firstChild).toBeFalsy();
  });
});
