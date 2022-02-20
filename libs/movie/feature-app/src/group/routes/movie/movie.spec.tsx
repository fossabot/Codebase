import { render } from "@testing-library/react";

import { GroupMovie } from "./movie";

describe("Movie", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<GroupMovie />);
    expect(baseElement).toBeTruthy();
  });
});
