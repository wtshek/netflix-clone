import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { MobileMenu } from './MobileMenu';

describe('MobileMenu component', () => {
  const items = ['Item 1', 'Item 2', 'Item 3'];

  it('renders nothing when visible prop is false', () => {
    const { container } = render(<MobileMenu visible={false} items={items} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders a menu when visible prop is true', () => {
    act(() => {
      render(<MobileMenu visible={true} items={items} />);
    });
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Item 3')).toBeInTheDocument();
  });
});
