import React from 'react';
import { TypographyProps } from './types';

const Typography: React.FC<TypographyProps> = ({
  variant,
  color,
  className,
  fontFamily,
  children,
}) => {
  let Component: keyof JSX.IntrinsicElements = 'p';

  switch (variant) {
    case 'h1':
      Component = 'h1';
      break;
    case 'h2':
      Component = 'h2';
      break;
    case 'h3':
      Component = 'h3';
      break;
    case 'h4':
      Component = 'h4';
      break;
    case 'h5':
      Component = 'h5';
      break;
    case 'h6':
      Component = 'h6';
      break;
    case 'body':
      Component = 'p';
      break;
    case 'caption':
      Component = 'span';
      break;
    default:
      break;
  }

  return (
    <Component className={className} style={{ color }}>
      {children}
    </Component>
  );
};

export default Typography;
