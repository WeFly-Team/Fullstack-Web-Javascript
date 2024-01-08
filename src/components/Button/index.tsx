import { ButtonProps } from './types';
import '../../index.css';
import { cva } from 'class-variance-authority';
import cn from '../../util/cn';

const buttonVariants = cva("rounded-xl", {
  variants: {
    variant: {
      primary: "font-semibold text-white hover:shadow-lg hover:opacity-80 transition duration-300 ease-in-out bg-primary-brightBlue w-[300px] h-11",
      secondary: "font-semibold text-black hover:shadow-lg hover:opacity-80 transition duration-300 ease-in-out bg-white w-[300px] h-11",
      tertiary: "font-semibold text-white hover:shadow-lg hover:opacity-80 transition duration-300 ease-in-out bg-black w-[300px] h-11"
    },
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl"
    }
  },
  defaultVariants: {
    variant: "primary",
    size: "sm"
  }
})

const Button = ({ children, className, variant, size, ...props }: ButtonProps) => {
  return (
    <>
      <button {...props} className={cn(buttonVariants({ variant, size, className }))}>{children}</button>
    </>
  )
}

export default Button;