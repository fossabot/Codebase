import { ContainedButton } from './variants/contained';
import { OutlinedButton } from './variants/outlined';
import { TextButton } from './variants/text';

export interface Props {
  shadow?: `${string}px`;
  size?: string;
  variant?: 'outlined' | 'text' | 'contained';
  onClick?: (e: any) => void;
  children: any;
  [key: string]: any;
}

/**
  Text color: `--text-color`

  Background color: `--bg-color`

  Secondary background color: `--bg-secondary-color`

  Background hover color: `--bg-color--hover`
  
  Background secondary hover color: `--bg-secondary-color--hover`
*/
export function Button({
  variant = 'contained',
  shadow,
  size,
  onClick,
  children,
}: Props) {
  const props = {
    shadow,
    size,
    onClick,
  };
  switch (variant) {
    case 'text':
      return <TextButton {...props}>{children}</TextButton>;
    case 'contained':
      return <ContainedButton {...props}>{children}</ContainedButton>;
    case 'outlined':
      return <OutlinedButton {...props}>{children}</OutlinedButton>;
    default:
      return <ContainedButton {...props}>{children}</ContainedButton>;
  }
}
