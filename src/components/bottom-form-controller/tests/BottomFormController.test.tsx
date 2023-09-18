import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import '@testing-library/jest-dom';

import { BottomControllerProps } from '../types';
import BottomFormController from '..';

const renderComponent = (props: BottomControllerProps) => {
  return render(
    <RecoilRoot>
      <BottomFormController {...props} />
    </RecoilRoot>
  );
};

describe('BottomFormController Component', () => {
  const mockUseRecoil = jest.spyOn(require('recoil'), 'useRecoilValue');

  test('renders the component with primary and secondary buttons', () => {
    renderComponent({
      primarybuttonLabel: 'Submit',
      secondaryButtonLabel: 'Cancel',
      formId: 'sampleId',
      onSubmit: () => {},
      onCancel: () => {}
    });

    const primaryButton = screen.getByTestId('submit-button');
    const secondaryButton = screen.getByTestId('cancel-button');

    expect(primaryButton).toBeInTheDocument();
    expect(secondaryButton).toBeInTheDocument();
  });

  test('calls onSubmit when primary button is clicked', () => {
    const handleClick = jest.fn();

    mockUseRecoil.mockReturnValue(true);
    renderComponent({
      primarybuttonLabel: 'Submit',
      secondaryButtonLabel: 'Cancel',
      formId: 'sampleId',
      onSubmit: handleClick,
      onCancel: () => {}
    });

    fireEvent.click(screen.getByTestId('submit-button'));
    expect(handleClick).toBeCalledTimes(1);
  });

  test('calls onCancel when secondary button is clicked', () => {
    const onCancelMock = jest.fn();

    renderComponent({
      primarybuttonLabel: 'Submit',
      secondaryButtonLabel: 'Cancel',
      formId: 'sampleId',

      onSubmit: () => {},
      onCancel: onCancelMock
    });

    const secondaryButton = screen.getByTestId('cancel-button');

    fireEvent.click(secondaryButton);

    expect(onCancelMock).toHaveBeenCalledTimes(1);
  });

  test('disables primary button when isSubmitButtonEnabled is false', () => {
    const handleClick = jest.fn();

    renderComponent({
      primarybuttonLabel: 'Submit',
      secondaryButtonLabel: 'Cancel',
      formId: 'sampleId',
      onSubmit: handleClick,
      onCancel: () => {}
    });

    const primaryButton = screen.getByTestId('submit-button');

    fireEvent.click(primaryButton);

    expect(primaryButton).toHaveAttribute('disabled');
    expect(handleClick).toHaveBeenCalledTimes(0);
  });
  test('snapshot test for BottomFormController component', () => {
    const component = renderComponent({
      primarybuttonLabel: 'Submit',
      secondaryButtonLabel: 'Cancel',
      formId: 'sampleId',
      onSubmit: () => {},
      onCancel: () => {}
    });

    expect(component).toMatchSnapshot();
  });
});
