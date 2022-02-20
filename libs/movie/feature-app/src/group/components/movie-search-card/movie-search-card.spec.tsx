import { render } from "@testing-library/react";

import MovieSearchCard from "./movie-search-card";

describe("MovieSearchCard", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <MovieSearchCard
        movie={{ title: "sj" }}
        onAdd={() => {
          console.log("tesing");
        }}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
