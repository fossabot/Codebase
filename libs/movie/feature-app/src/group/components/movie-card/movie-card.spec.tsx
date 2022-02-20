import { render } from '@testing-library/react';

import MovieCard from './movie-card';

describe('MovieCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(< MovieCard />);
    expect(baseElement).toBeTruthy();
  });
});
