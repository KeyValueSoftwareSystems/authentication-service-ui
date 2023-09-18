import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import TableChipElement from '../TableChipElement';

const rowItems1 = {
  row: {
    permissions: [
      { id: '1', name: 'P1', label: 'Permission 1' },
      { id: '2', name: 'P2', label: 'Permission 2' },
      { id: '3', name: 'P3', label: 'Permission 3' }
    ]
  }
};

const rowItems2 = {
  row: {
    permissions: [
      { id: '1', name: 'P1', label: 'Permission 1' },
      { id: '2', name: 'P2', label: 'Permission 2' }
    ]
  }
};

describe('TableChipElement Component', () => {
  test('renders chips with default size', () => {
    render(<TableChipElement rowItems={rowItems2} defaultSize={2} columnName='permissions' />);

    const chip1 = screen.getByText('Permission 1');
    const chip2 = screen.getByText('Permission 2');

    expect(chip1).toBeInTheDocument();
    expect(chip2).toBeInTheDocument();
  });

  test('renders chips with more items hidden', () => {
    render(<TableChipElement rowItems={rowItems1} defaultSize={2} columnName='permissions' />);

    const chip1 = screen.getByText('Permission 1');
    const chip2 = screen.getByText('Permission 2');
    const countChip = screen.getByText('+1');

    expect(chip1).toBeInTheDocument();
    expect(chip2).toBeInTheDocument();
    expect(countChip).toBeInTheDocument();
  });

  test('clicking on count chip opens the modal', () => {
    render(<TableChipElement rowItems={rowItems1} defaultSize={2} columnName='permissions' />);

    const countChip = screen.getByText('+1');

    fireEvent.click(countChip);

    waitFor(() => {
      const modal = screen.getByTestId('custom-dialog');

      expect(modal).toBeInTheDocument();
    });
  });
  test('matches snapshot', () => {
    const component = render(<TableChipElement rowItems={rowItems1} defaultSize={2} columnName='permissions' />);

    expect(component).toMatchSnapshot();
  });
});
