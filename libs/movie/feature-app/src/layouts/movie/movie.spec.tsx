import { render } from "@testing-library/react";

import { MovieLayout } from "./movie";

describe("Movie", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<MovieLayout />);
    expect(baseElement).toBeTruthy();
  });
});
