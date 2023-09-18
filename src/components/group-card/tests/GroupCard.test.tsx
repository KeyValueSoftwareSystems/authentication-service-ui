import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import GroupCard from '../GroupCard';

const group1 = {
  id: '1',
  name: 'Group 1',
  roles: [
    { id: '1', name: 'Role 1', permissions: [{ id: '2', name: 'P2', label: 'Permission 2' }] },
    { id: '2', name: 'Role 2', permissions: [{ id: '1', name: 'P1', label: 'Permission 1' }] }
  ],
  permissions: [
    { id: '1', name: 'P1', label: 'Permission 1' },
    { id: '2', name: 'P2', label: 'Permission 2' }
  ],
  allPermissions: [
    { id: '1', name: 'P1', label: 'Permission 1' },
    { id: '2', name: 'P2', label: 'Permission 2' },
    { id: '3', name: 'P3', label: 'Permission 3' }
  ]
};

const group2 = {
  id: '1',
  name: 'Group 1',
  permissions: [
    { id: '1', name: 'P1', label: 'Permission 1' },
    { id: '2', name: 'P2', label: 'Permission 2' }
  ],
  allPermissions: [
    { id: '1', name: 'P1', label: 'Permission 1' },
    { id: '2', name: 'P2', label: 'Permission 2' },
    { id: '3', name: 'P3', label: 'Permission 3' }
  ]
};

describe('GroupCard Component', () => {
  test('renders GroupCard with checkbox and roles tab', () => {
    render(<GroupCard group={group1} />);

    const groupCheckbox = screen.getByTestId('group-card-checkbox-test-id');
    const groupName = screen.getByText('Group 1');
    const rolesTab = screen.getByText('2 Roles & 2 Permissions');

    expect(groupCheckbox).toBeInTheDocument();
    expect(groupName).toBeInTheDocument();
    expect(rolesTab).toBeInTheDocument();
  });

  test('clicking on "View" opens the permissions modal', () => {
    render(<GroupCard group={group2} />);

    const viewLink = screen.getByText('View');

    fireEvent.click(viewLink);

    const permissionsModal = screen.getByText('Permissions');

    expect(permissionsModal).toBeInTheDocument();
  });

  test('renders GroupCard without checkbox', () => {
    render(<GroupCard group={group2} showCheckBox={false} />);

    const groupCheckbox = screen.queryByTestId('group-card-checkbox-test-id');

    expect(groupCheckbox).toBeNull();
  });

  test('matches snapshot', () => {
    const component = render(<GroupCard group={group1} showCheckBox={false} />);

    expect(component).toMatchSnapshot();
  });
});
