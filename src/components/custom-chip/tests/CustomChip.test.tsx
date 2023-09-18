import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import CustomChip from '../CustomChip';

describe('CustomChip Component', () => {
  test('snapshot test for CustomChip component', () => {
    const chipName = 'Sample Chip';
    const component = render(<CustomChip name={chipName} />);

    expect(component).toMatchSnapshot();
  });

  test('renders CustomChip component with text content', () => {
    const chipName = 'Sample Chip';

    render(<CustomChip name={chipName} />);
    const customChipElement = screen.getByTestId('custom-chip');

    if (!customChipElement) throw new Error('Chip component is not rendered');
    expect(customChipElement).toHaveTextContent(chipName);
  });
});
