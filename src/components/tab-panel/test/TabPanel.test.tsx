import { render, screen } from '@testing-library/react';
import TabPanel from '../TabPanel';

describe('If tabPanel rendered correctly', () => {
  test('If snapshot rendered', () => {
    const component = render(<TabPanel index={1} value={1} />);

    expect(component).toMatchSnapshot();
  });

  test('If box rendered', () => {
    render(<TabPanel index={1} value={1} />);

    const boxElement = screen.getByTestId('box');

    if (!boxElement) throw Error('Box not rendered');
  });

  test('If box not rendered', () => {
    render(<TabPanel index={1} value={5} />);

    try {
      screen.getByTestId('box');
    } catch (e) {
      return;
    }
    throw Error('Box rendered');
  });
});
