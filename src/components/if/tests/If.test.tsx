import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import If from '../If';

describe('If Component', () => {
  test('renders children when condition is true', () => {
    render(
      <If condition={true}>
        <div data-testid='child'>This should be rendered</div>
      </If>
    );

    const childElement = screen.getByTestId('child');

    expect(childElement).toBeInTheDocument();
  });

  test('does not render children when condition is false', () => {
    render(
      <If condition={false}>
        <div data-testid='child'>This should not be rendered</div>
      </If>
    );

    const childElement = screen.queryByTestId('child');

    expect(childElement).not.toBeInTheDocument();
  });

  test('does not render children when condition is falsy (0)', () => {
    render(
      <If condition={0}>
        <div data-testid='child'>This should not be rendered</div>
      </If>
    );

    const childElement = screen.queryByTestId('child');

    expect(childElement).not.toBeInTheDocument();
  });

  test('renders children when condition is truthy (non-zero number)', () => {
    render(
      <If condition={42}>
        <div data-testid='child'>This should be rendered</div>
      </If>
    );

    const childElement = screen.getByTestId('child');

    expect(childElement).toBeInTheDocument();
  });

  test('snapshot test for If component', () => {
    const component = render(
      <If condition={true}>
        <div>This should be rendered</div>
      </If>
    );

    expect(component).toMatchSnapshot();
  });
});
