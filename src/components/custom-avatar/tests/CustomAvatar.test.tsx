import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { CustomAvatar } from '../CustomAvatar';

describe('CustomAvatar Component', () => {
  const firstName = 'John';
  const lastName = 'Doe';
  const email = 'john.doe@example.com';

  const renderComponent = () => {
    return render(<CustomAvatar firstName={firstName} lastName={lastName} email={email} />);
  };

  test('renders the CustomAvatar component with provided props', () => {
    const { container } = renderComponent();

    expect(container).toBeInTheDocument();

    expect(screen.getByText(`${firstName} ${lastName}`)).toBeInTheDocument();
    expect(screen.getByText(email)).toBeInTheDocument();
  });

  test('matches snapshot', () => {
    const component = renderComponent();

    expect(component).toMatchSnapshot();
  });
});
