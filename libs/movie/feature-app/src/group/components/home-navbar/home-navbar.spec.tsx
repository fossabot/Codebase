import { render } from "@testing-library/react";

import Navbar from "./home-navbar";

describe("Navbar", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<Navbar group={void 0} />);
    expect(baseElement).toBeTruthy();
  });
});
