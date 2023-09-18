import { fireEvent, render, screen } from '@testing-library/react';
import Filter from '../Filter';

describe('If Filter rendered correctly', () => {
  const onAddFilter = jest.fn();
  const setCheckedItems = jest.fn();
  const handleCheckedItems = jest.fn();
  const FilterProps = {
    itemList: ['demo'],
    onAddFilter,
    checkedItems: [],
    setCheckedItems,
    handleCheckedItems
  };

  test('If snapshot rendered', () => {
    const component = render(<Filter {...FilterProps} />);

    expect(component).toMatchSnapshot();
  });

  test('If filter displayed', () => {
    render(<Filter {...FilterProps} />);

    const element = screen.getAllByTestId('filter-list-item-test-id');

    expect(element).toBeDefined();
  });

  test('If onChange triggered on clicking checkbox', () => {
    render(<Filter {...FilterProps} />);

    const element = screen.getByTestId('filter-checkbox-test-0');

    fireEvent.click(element);

    expect(onAddFilter).toBeCalledTimes(1);
  });
});
