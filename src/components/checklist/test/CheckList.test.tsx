/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { fireEvent, render, screen } from '@testing-library/react';
import { ChecklistComponent } from '../CheckList';

describe('If CheckList rendered correctly', () => {
  const groups = [
    {
      id: '1',
      name: 'Group 1',
      permissions: [{ id: '01', name: 'Permission1' }],
      allPermissions: [{ id: '01', name: 'Permission1' }]
    },
    {
      id: '2',
      name: 'Group 2',
      permissions: [{ id: '02', name: 'Permission2' }],
      allPermissions: [{ id: '02', name: 'Permission2' }]
    }
  ];

  const onChange = jest.fn();

  const checkListProps = {
    mapList: groups,
    currentCheckedItems: groups,
    onChange
  };

  test('If snapshot rendered', () => {
    const component = render(<ChecklistComponent {...checkListProps} />);

    expect(component).toMatchSnapshot();
  });

  test('If onChange triggered on checkbox clicked', () => {
    render(<ChecklistComponent {...checkListProps} />);

    const element = screen.getByTestId('checklist-checkbox-test-id');

    fireEvent.click(element.querySelector('input')!);

    expect(onChange).toBeCalledTimes(1);
  });
});
