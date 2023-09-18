import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PermissionsCard from '../PermissionCard';

describe('If permission card rendered correctly', () => {
  const entity = {
    id: '11',
    name: 'entity',
    permissions: [
      {
        id: '22',
        name: 'create-permissions-1'
      }
    ]
  };
  const permissionCardProps = {
    entity,
    isViewPage: true,
    userPermissions: [
      {
        id: '22',
        name: 'create-permissions-1'
      }
    ]
  };

  test('If snapshot rendered', () => {
    const component = render(<PermissionsCard {...permissionCardProps} />);

    expect(component).toMatchSnapshot();
  });

  test('If entity name rendered correctly', () => {
    render(<PermissionsCard {...permissionCardProps} />);

    const element = screen.getByTestId('permission-card-entity-name');

    expect(element).toHaveTextContent('entity');
  });

  test('If permissions label rendered correctly', () => {
    render(<PermissionsCard {...permissionCardProps} />);

    const element = screen.getByTestId('permission-label-test');

    expect(element).toHaveTextContent('create-permissions-1');
  });
});
