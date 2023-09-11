import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import DialogBox from '../CustomDialog';

const mockProps = {
  title: 'Sample Title',
  handleClose: jest.fn()
};

const renderComponent = (props = {}) => {
  const mergedProps = { ...mockProps, ...props };

  return render(<DialogBox {...mergedProps} />);
};

describe('DialogBox Component', () => {
  test('renders the component with title and close button', () => {
    renderComponent();

    const dialogTitle = screen.getByText('Sample Title');
    const closeIcon = screen.getByTestId('close-button');

    expect(dialogTitle).toBeInTheDocument();
    expect(closeIcon).toBeInTheDocument();
  });

  test('calls handleClose when close button is clicked', () => {
    renderComponent();

    const closeIcon = screen.getByTestId('close-button');

    fireEvent.click(closeIcon);

    expect(mockProps.handleClose).toHaveBeenCalledTimes(1);
  });

  test('matches snapshot', () => {
    const component = renderComponent();

    expect(component).toMatchSnapshot();
  });
});
