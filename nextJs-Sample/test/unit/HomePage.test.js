import React from 'react';  // Add this line
import { render, screen } from '@testing-library/react';
import Home from '../../src/app/page'; // Adjust path if necessary

describe('Home page', () => {
  it('renders the homepage', () => {
    render(<Home />);
    expect(screen.getByText('This is Home page of NextJS')).toBeInTheDocument();
  });
});
