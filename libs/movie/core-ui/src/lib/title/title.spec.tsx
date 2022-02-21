import { render } from "@testing-library/react";

import { Title } from "./title";

describe("Title", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<Title>hello</Title>);
    expect(baseElement).toBeTruthy();
    expect(baseElement).toContain("hello");
  });
});
