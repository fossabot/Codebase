import { render } from '@testing-library/react';

import MovieNavbar from './movie-navbar';

describe('MovieNavbar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(< MovieNavbar />);
    expect(baseElement).toBeTruthy();
  });
});
