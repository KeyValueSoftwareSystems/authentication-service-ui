export interface FormInputProps {
  name: string;
  label: string;
  type: string;
  isDisabled?: boolean;
  className?: string;
  defaultText?: string;
  autoComplete?: string;
  endAdornment?: React.ReactNode;
  showEndAdornment?: boolean;
}
