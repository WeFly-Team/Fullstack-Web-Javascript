import React from 'react';

export interface TypographyProps {
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'caption';
  color?: string;
  className?: string;
  children?: React.ReactNode;
}

export default TypographyProps;
