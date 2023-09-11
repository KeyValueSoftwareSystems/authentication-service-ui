import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import RoleCardsChecklist from '../RoleCardsChecklist';

const mockRoleList = [
  {
    id: '1',
    name: 'Role 1',
    permissions: [
      { id: '1', name: 'P1', label: 'Permission 1' },
      { id: '2', name: 'P2', label: 'Permission 2' }
    ]
  },
  {
    id: '2',
    name: 'Role 2',
    permissions: [{ id: '3', name: 'P3', label: 'Permission 1' }]
  }
];

const mockCheckedItems = [
  {
    id: '2',
    name: 'Test Role',
    permissions: [{ id: '3', name: 'P3', label: 'Permission 1' }]
  }
];

describe('RoleCardsChecklist Component', () => {
  test('renders RoleCardsChecklist component with role cards', () => {
    render(<RoleCardsChecklist currentCheckedItems={mockCheckedItems} roleList={mockRoleList} />);

    const role1Card = screen.getByText('Role 1');
    const role2Card = screen.getByText('Role 2');

    expect(role1Card).toBeInTheDocument();
    expect(role2Card).toBeInTheDocument();
  });

  test('renders "Select all" checkbox', () => {
    render(<RoleCardsChecklist currentCheckedItems={mockCheckedItems} roleList={mockRoleList} />);

    const selectAllCheckbox = screen.getByTestId('select-all');

    expect(selectAllCheckbox).toBeInTheDocument();
  });

  test('checks "Select all" checkbox when clicked', () => {
    render(<RoleCardsChecklist currentCheckedItems={mockCheckedItems} roleList={mockRoleList} />);

    const selectAllCheckbox = screen.getByTestId('select-all');

    if (!selectAllCheckbox) throw new Error('Checked icon is not present');
    fireEvent.click(selectAllCheckbox);

    waitFor(() => expect(screen.getByTestId('select-all')).toHaveAttribute('value', 'all'));
  });

  test('unchecks "Select all" checkbox when clicked again', () => {
    render(<RoleCardsChecklist currentCheckedItems={mockCheckedItems} roleList={mockRoleList} />);

    const selectAllCheckbox = screen.getByTestId('select-all');

    fireEvent.click(selectAllCheckbox);
    fireEvent.click(selectAllCheckbox);

    expect(selectAllCheckbox).not.toBeChecked();
  });

  test('calls onChange when "Select all" checkbox is clicked', () => {
    const onChangeMock = jest.fn();

    render(
      <RoleCardsChecklist currentCheckedItems={mockCheckedItems} roleList={mockRoleList} onChange={onChangeMock} />
    );

    const selectAllCheckbox = screen.getByTestId('select-all');

    fireEvent.click(selectAllCheckbox);

    waitFor(() => {
      expect(onChangeMock).toHaveBeenCalledTimes(1);
    });
  });

  test('matches snapshot', () => {
    const component = render(<RoleCardsChecklist currentCheckedItems={mockCheckedItems} roleList={mockRoleList} />);

    expect(component).toMatchSnapshot();
  });
});
