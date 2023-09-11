import { render } from '@testing-library/react';
import { HashRouter as Router } from 'react-router-dom';
import SideBar from '../SideBar';

describe('If SideBar rendered', () => {
  test('If snapshot rendered', () => {
    const component = render(
      <Router>
        <SideBar />
      </Router>
    );

    expect(component).toMatchSnapshot();
  });
});
