import React from 'react';
import { RecoilRoot } from 'recoil';
import { FormProvider, useForm } from 'react-hook-form';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import FormInputText from '../FormInputText';

const sampleProps = {
  name: 'testName',
  label: 'Test Label',
  type: 'text',
  className: 'testClassName',
  defaultText: 'Default Text',
  autoComplete: 'off'
};

describe('FormInputText Component', () => {
  const FormInputTextWithForm = (props: {
    children: React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment;
  }) => {
    const formMethods = useForm();

    return <FormProvider {...formMethods}>{props.children}</FormProvider>;
  };

  test('renders FormInputText component with props', () => {
    render(
      <FormInputTextWithForm>
        <RecoilRoot>
          <FormInputText {...sampleProps} />
        </RecoilRoot>
      </FormInputTextWithForm>
    );
    const inputElement = screen.getByRole('textbox', { name: /Test Label/i });

    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue('Default Text');
  });

  test('matches snapshot', () => {
    const component = render(
      <FormInputTextWithForm>
        <RecoilRoot>
          <FormInputText {...sampleProps} />
        </RecoilRoot>
      </FormInputTextWithForm>
    );

    expect(component).toMatchSnapshot();
  });
});
