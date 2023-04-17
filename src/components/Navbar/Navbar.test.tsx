import React from 'react';
import { render } from '@testing-library/react';
import Navbar from './Navbar';

describe('Navbar', () => {
  it('renders correctly', () => {
    const { getByAltText, getByText } = render(<Navbar />);
    expect(getByAltText('logo')).toBeInTheDocument();
    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('Series')).toBeInTheDocument();
    expect(getByText('Films')).toBeInTheDocument();
    expect(getByText('New & Popular')).toBeInTheDocument();
    expect(getByText('My List')).toBeInTheDocument();
    expect(getByText('Browse by languages')).toBeInTheDocument();
  });
});
