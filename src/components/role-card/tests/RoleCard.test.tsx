import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import RoleCard from '../RoleCard';

const mockRole = {
  id: '1',
  name: 'Test Role',
  permissions: [
    { id: '1', name: 'P1', label: 'Permission 1' },
    { id: '2', name: 'P2', label: 'Permission 2' }
  ]
};

describe('RoleCard Component', () => {
  it('renders RoleCard component with role name', () => {
    render(<RoleCard role={mockRole} />);
    const roleNameElement = screen.getByText('Test Role');

    expect(roleNameElement).toBeInTheDocument();
  });

  it('renders checkboxes when checked prop is provided', () => {
    render(<RoleCard role={mockRole} checked={true} />);
    const checkboxElement = screen.getByRole('checkbox');

    expect(checkboxElement).toBeInTheDocument();
  });

  it('does not render checkboxes when checked prop is null', () => {
    render(<RoleCard role={mockRole} checked={null} />);
    const checkboxElement = screen.queryByRole('checkbox');

    expect(checkboxElement).toBeNull();
  });

  it('triggers onChange callback when checkbox is clicked', () => {
    const onChangeMock = jest.fn();

    render(<RoleCard role={mockRole} checked={true} onChange={onChangeMock} />);
    const checkboxElement = screen.getByRole('checkbox');

    fireEvent.click(checkboxElement);
    expect(onChangeMock).toHaveBeenCalledTimes(1);
  });

  it('renders role permissions', () => {
    render(<RoleCard role={mockRole} />);
    const permission1Element = screen.getByText('Permission 1');
    const permission2Element = screen.getByText('Permission 2');

    expect(permission1Element).toBeInTheDocument();
    expect(permission2Element).toBeInTheDocument();
  });

  it('renders more permissions button when there are additional permissions', () => {
    const roleWithManyPermissions = {
      ...mockRole,
      permissions: Array.from({ length: 8 }, (_, index) => ({
        id: `${index + 1}`,
        name: `P${index + 1}`,
        label: `Permission ${index + 1}`
      }))
    };

    render(<RoleCard role={roleWithManyPermissions} />);
    const morePermissionsButton = screen.getByText('+3 more');

    expect(morePermissionsButton).toBeInTheDocument();
  });

  it('renders dialog when more permissions button is clicked', () => {
    const roleWithManyPermissions = {
      ...mockRole,
      permissions: Array.from({ length: 8 }, (_, index) => ({
        id: `${index + 1}`,
        name: `P${index + 1}`,
        label: `Permission ${index + 1}`
      }))
    };

    render(<RoleCard role={roleWithManyPermissions} />);
    const morePermissionsButton = screen.getByText('+3 more');

    fireEvent.click(morePermissionsButton);
    const dialogTitle = screen.getByText('Permissions');

    expect(dialogTitle).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const component = render(<RoleCard role={mockRole} />);

    expect(component).toMatchSnapshot();
  });
});
