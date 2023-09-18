import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import client from '@/services/apolloClient';
import Settings from '../Settings';

const settingsProps = {
  fullName: 'John Doe',
  initials: { sx: { bgcolor: 'blue' }, children: 'JD' },
  email: 'johndoe@example.com',
  anchorEl: document.body,
  handleClose: jest.fn(),
  onLogoutCompleted: jest.fn()
};

describe('Settings Component', () => {
  test('renders Settings with user details', () => {
    render(
      <ApolloProvider client={client}>
        <Settings {...settingsProps} />
      </ApolloProvider>
    );

    const userAvatar = screen.getByText('JD');
    const fullName = screen.getByText('John Doe');
    const email = screen.getByText('johndoe@example.com');

    expect(userAvatar).toBeInTheDocument();
    expect(fullName).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  });

  test('matches snapshot', () => {
    const component = render(
      <ApolloProvider client={client}>
        <Settings {...settingsProps} />
      </ApolloProvider>
    );

    expect(component).toMatchSnapshot();
  });
});
