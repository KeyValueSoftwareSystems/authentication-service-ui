import { fireEvent, render, screen } from '@testing-library/react';
import CustomPagination from '../CustomPagination';
import { RecoilRoot } from 'recoil';
import '@testing-library/jest-dom';

describe('If custom pagination rendered correctly', () => {
  const fetchEntities = jest.fn();
  const customPaginationProps = {
    fetchEntities,
    count: 10
  };

  test('If snapshot rendered', () => {
    const component = render(
      <RecoilRoot>
        <CustomPagination {...customPaginationProps} />
      </RecoilRoot>
    );

    expect(component).toMatchSnapshot();
  });

  test('If count rendered correctly', () => {
    render(
      <RecoilRoot>
        <CustomPagination {...customPaginationProps} />
      </RecoilRoot>
    );
    const element = screen.getByTestId('custom-pagination-count-test');

    expect(element).toHaveTextContent('Total 10 items');
  });

  test('If pagination callback worked correctly', () => {
    render(
      <RecoilRoot>
        <CustomPagination {...customPaginationProps} />
      </RecoilRoot>
    );

    const element = screen.getByTestId('custom-pagination-test');

    const buttons = element.querySelectorAll('button');

    const enabledButton = Array.from(buttons)?.find((button) => {
      try {
        expect(button).toHaveAttribute('disabled');
      } catch (e) {
        return true;
      }

      return false;
    });

    if (enabledButton) fireEvent.click(enabledButton);
    expect(fetchEntities).toHaveBeenCalledTimes(1);
  });
});
