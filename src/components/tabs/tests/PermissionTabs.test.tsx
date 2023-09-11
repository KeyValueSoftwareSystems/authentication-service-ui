import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import PermissionTabs from '../PermissionTabs';

const mockPermissions = [
  { id: '1', name: 'Permission 1', permissions: [{ id: '11', name: 'Sub Permission 1' }] },
  { id: '2', name: 'Permission 2', permissions: [{ id: '12', name: 'Sub Permission 2' }] }
];

describe('PermissionTabs Component', () => {
  it('renders PermissionTabs component with tabs', () => {
    render(<PermissionTabs permissions={mockPermissions} />);

    const overallPermissionsTab = screen.getByText('Overall Permissions');
    const permission1Tab = screen.getByText('Permission 1');
    const permission2Tab = screen.getByText('Permission 2');

    expect(overallPermissionsTab).toBeInTheDocument();
    expect(permission1Tab).toBeInTheDocument();
    expect(permission2Tab).toBeInTheDocument();
  });

  it('renders tab panels with permission details', () => {
    render(<PermissionTabs permissions={mockPermissions} />);

    const overallPermissionsPanel = screen.getByText('Sub Permission 1');
    const permission1Panel = screen.getByText('Sub Permission 1');
    const permission2Panel = screen.getByText('Sub Permission 2');

    expect(overallPermissionsPanel).toBeInTheDocument();
    expect(permission1Panel).toBeInTheDocument();
    expect(permission2Panel).toBeInTheDocument();
  });

  it('changes the active tab when a tab is clicked', () => {
    render(<PermissionTabs permissions={mockPermissions} />);

    const permission1Tab = screen.getByText('Permission 1');
    const permission2Tab = screen.getByText('Permission 2');

    fireEvent.click(permission1Tab);
    const activeTab1 = screen.getByText('Sub Permission 1');

    expect(activeTab1).toBeInTheDocument();

    fireEvent.click(permission2Tab);
    const activeTab2 = screen.getByText('Sub Permission 2');

    expect(activeTab2).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const component = render(<PermissionTabs permissions={mockPermissions} />);

    expect(component).toMatchSnapshot();
  });
});
