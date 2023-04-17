import React from 'react';
import { NavbarItem } from './NavbarItem';
import { render } from '@testing-library/react';

describe('NavbarItem', () => {
  const mockLabel = 'Home';

  it('should render correctly', () => {
    const component = render(<NavbarItem label={mockLabel} />);
    expect(component).toMatchSnapshot();
  });
});
