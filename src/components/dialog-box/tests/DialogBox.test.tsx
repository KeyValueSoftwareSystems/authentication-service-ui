import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { GridRowId } from '@mui/x-data-grid';
import '@testing-library/jest-dom';

import { GET_GROUPS } from '@/services/queries/groupQueries';
import { DELETE_GROUP } from '@/services/mutations/groupMutations';
import DialogBox from '../DialogBox';

const mockProps = {
  entity: 'EntityName',
  entityId: '' as GridRowId,
  onConfirm: jest.fn(),
  handleClose: jest.fn(),
  deleteMutation: DELETE_GROUP,
  refetchQuery: GET_GROUPS
};

const renderComponent = (props = {}) => {
  return render(<DialogBox {...mockProps} {...props} />);
};

describe('DialogBox Component', () => {
  test('renders the component with dialog content', () => {
    renderComponent();

    const dialogTitle = screen.getByText('Confirm the Deletion!');
    const dialogContentText1 = screen.getByText('Deleting entityname will remove all it’s details. Do you really');
    const dialogContentText2 = screen.getByText('want to delete the entityname?');
    const noButton = screen.getByText('No, keep it');
    const yesButton = screen.getByText('Yes, Delete it');

    expect(dialogTitle).toBeInTheDocument();
    expect(dialogContentText1).toBeInTheDocument();
    expect(dialogContentText2).toBeInTheDocument();
    expect(noButton).toBeInTheDocument();
    expect(yesButton).toBeInTheDocument();
  });

  test('calls handleClose when cancel button is clicked', () => {
    renderComponent();

    const noButton = screen.getByTestId('cancel-button');

    fireEvent.click(noButton);

    expect(mockProps.handleClose).toHaveBeenCalledTimes(1);
  });

  test('calls onConfirm when delete button is clicked', () => {
    renderComponent();

    const yesButton = screen.getByTestId('delete-button');

    fireEvent.click(yesButton);

    expect(mockProps.onConfirm).toHaveBeenCalledTimes(1);
  });

  test('matches snapshot', () => {
    const component = renderComponent();

    expect(component).toMatchSnapshot();
  });
});
