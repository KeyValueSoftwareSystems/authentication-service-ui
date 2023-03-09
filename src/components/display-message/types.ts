import { CSSProperties } from 'react';

export interface DisplayMessageProps {
  customStyle?: CSSProperties;
  altMessage: string;
  image: string;
  heading: string;
  description: string;
  imageStyles?: CSSProperties;
  containerStyles?: CSSProperties;
  className?: string;
}
