import React from 'react';
import { RecoilRoot } from 'recoil';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import Toast from '../Toast';

describe('Toast Component', () => {
  test('renders with success message', () => {
    const handleClose = jest.fn();
    const message = 'This is a success message';
    const isOpen = true;

    render(
      <RecoilRoot>
        <Toast isOpen={isOpen} message={message} handleClose={handleClose} />
      </RecoilRoot>
    );

    const alertElement = screen.getByTestId('alert');

    expect(alertElement).toBeInTheDocument();
    expect(alertElement).toHaveTextContent(message);

    const closeIcon = screen.getByRole('button', { name: /close/i });

    expect(closeIcon).toBeInTheDocument();

    waitFor(() => {
      userEvent.click(closeIcon);
      expect(handleClose).toHaveBeenCalledTimes(1);
    });
  });

  test('renders with error message', () => {
    const handleClose = jest.fn();
    const message = 'This is an error message';
    const isOpen = true;

    render(
      <RecoilRoot>
        <Toast isOpen={isOpen} message={message} handleClose={handleClose} />
      </RecoilRoot>
    );

    const alertElement = screen.getByTestId('alert');

    expect(alertElement).toBeInTheDocument();
    expect(alertElement).toHaveTextContent(message);

    const closeIcon = screen.getByRole('button', { name: /close/i });

    expect(closeIcon).toBeInTheDocument();
    waitFor(() => {
      userEvent.click(closeIcon);
      expect(handleClose).toHaveBeenCalledTimes(1);
    });
  });

  test('does not render when isOpen is false', () => {
    const handleClose = jest.fn();
    const message = 'This message should not be displayed';
    const isOpen = false;

    render(
      <RecoilRoot>
        <Toast isOpen={isOpen} message={message} handleClose={handleClose} />
      </RecoilRoot>
    );

    const alertElement = screen.queryByRole('alert');

    expect(alertElement).not.toBeInTheDocument();
  });
  test('snapshot test for SearchBar component', () => {
    const handleClose = jest.fn();
    const message = 'This is an error message';
    const isOpen = true;

    const component = render(
      <RecoilRoot>
        <Toast isOpen={isOpen} message={message} handleClose={handleClose} />
      </RecoilRoot>
    );

    expect(component).toMatchSnapshot();
  });
});
