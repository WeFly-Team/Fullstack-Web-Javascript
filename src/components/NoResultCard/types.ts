import { HTMLAttributes } from 'react';

export interface NoResultCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  content: string;
}
