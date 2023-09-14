import React, { useState } from 'react';
import { Button, IconButton } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import FormInputText from '@/components/input-text';
import { ReactComponent as EyeCrossedIcon } from '@/assets/button-icons/eyecrossed.svg';
import { ReactComponent as EyeIcon } from '@/assets/button-icons/eyeicon.svg';
import { SET_PASSWORD } from '@/constants/messages';
import { UserActions } from '@/types/generic';
import { ConfirmPasswordSchema } from '../authSchema';
import { LOGO_URL } from '../../../config';
import './styles.css';

type Props = {
  onSubmitForm: (data: { newPassword: string; confirmPassword: string }) => void;
};

const PasswordConfirmation: React.FC<Props> = ({ onSubmitForm }) => {
  const initialValues = {
    newPassword: '',
    confirmPassword: ''
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const methods = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(ConfirmPasswordSchema)
  });
  const { handleSubmit } = methods;

  const changeShowPasswordState = () => {
    setShowPassword((currState) => !currState);
  };

  const changeConfirmShowPasswordState = () => {
    setShowConfirmPassword((currState) => !currState);
  };

  return (
    <div className='containerLogin'>
      <div className='logo'>
        <img alt='logo' src={LOGO_URL} />
      </div>
      <div className='password-message'>{SET_PASSWORD}</div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <FormInputText
            name='password'
            label='Enter Password'
            type={showPassword ? 'text' : 'password'}
            className='textBox'
            autoComplete='off'
            showEndAdornment={true}
            endAdornment={
              <IconButton onClick={changeShowPasswordState}>
                {showPassword ? <EyeCrossedIcon /> : <EyeIcon />}
              </IconButton>
            }
          />
          <FormInputText
            name='confirmPassword'
            label='Confirm Password'
            type={showConfirmPassword ? 'text' : 'password'}
            className='textBox'
            autoComplete='off'
            showEndAdornment={true}
            endAdornment={
              <IconButton onClick={changeConfirmShowPasswordState}>
                {showConfirmPassword ? <EyeCrossedIcon /> : <EyeIcon />}
              </IconButton>
            }
          />
          <Button variant='contained' type='submit' fullWidth className='login-button'>
            {UserActions.SUBMIT}
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default PasswordConfirmation;
