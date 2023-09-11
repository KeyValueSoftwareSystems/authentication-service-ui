import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import DisplayMessage from '../DisplayMessage';

describe('DisplayMessage Component', () => {
  const sampleProps1 = {
    customStyle: { color: 'blue' },
    altMessage: 'Sample Alt Message1',
    image: '/sample-image1.jpg',
    heading: 'Sample Heading1',
    description: 'Sample Description1',
    imageStyles: { width: '100px' },
    containerStyles: { backgroundColor: 'lightgray' },
    className: 'custom-class1'
  };

  const sampleProps2 = {
    altMessage: 'Sample Alt Message2',
    image: '/sample-image2.jpg',
    heading: 'Sample Heading2',
    description: 'Sample Description2'
  };

  test('renders DisplayMessage component with props', () => {
    render(<DisplayMessage {...sampleProps1} />);

    const displayMessageElement = screen.getByTestId('display-message');
    const headingElement = screen.getByTestId('display-message-heading');
    const descriptionElement = screen.getByTestId('display-message-description');
    const imageElement = screen.getByAltText(sampleProps1.altMessage);

    expect(displayMessageElement).toBeInTheDocument();
    expect(imageElement).toBeInTheDocument();
    expect(headingElement).toHaveTextContent(sampleProps1.heading);
    expect(descriptionElement).toHaveTextContent(sampleProps1.description);
    expect(imageElement).toHaveAttribute('src', sampleProps1.image);
  });

  test('renders DisplayMessage component with default className when className prop is not provided', () => {
    render(<DisplayMessage {...sampleProps2} />);

    waitFor(() => {
      const displayMessageElement = screen.getByTestId('display-message');

      expect(displayMessageElement).toHaveClass('display-message');
    });
  });
  test('snapshot test for DisplayMessage component', () => {
    const component = render(<DisplayMessage {...sampleProps2} />);

    expect(component).toMatchSnapshot();
  });
});
