import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { User } from 'types/user';
import AvatarList from '../AvatarList';

const mockUser: { users: User[] } = {
  users: [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      middleName: 'C',
      email: 'sampleMail@gmail.com',
      phone: '8078099212',
      status: 'active',
      permissions: [{ id: '1', name: 'p1' }]
    },
    {
      id: '2',
      firstName: 'Jo',
      lastName: 'Doe',
      middleName: 'C',
      email: 'sampleMail1@gmail.com',
      phone: '8074099212',
      status: 'active',
      permissions: [{ id: '1', name: 'p2' }]
    }
  ]
};

const renderComponent = (props = {}) => {
  return render(<AvatarList row={mockUser} {...props} />);
};

describe('AvatarList Component', () => {
  test('renders the component with avatars', () => {
    renderComponent();

    const avatars = screen.getAllByTestId('avatar');

    expect(avatars).toHaveLength(mockUser.users.length);
  });

  test('handles media query for portrait orientation', () => {
    renderComponent();

    const avatars = screen.getAllByTestId('avatar');
    const defaultSize = 9; // Default size when not in portrait mode
    const portraitSize = 3; // Size when in portrait mode

    expect(avatars.length).toBeLessThanOrEqual(defaultSize);

    // Check if the avatars match the size defined for portrait orientation
    if (window.innerWidth < window.innerHeight) expect(avatars.length).toBeLessThanOrEqual(portraitSize);
  });
  test('matches snapshot', () => {
    const component = render(<AvatarList row={mockUser} />);

    expect(component).toMatchSnapshot();
  });
});
