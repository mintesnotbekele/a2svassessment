'use client';
import React, { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

type ButtonVariant = 'primary' | 'secondary' | 'gradient';
type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'food-btn-primary',
  secondary: 'food-btn-secondary',
  gradient: 'food-btn-gradient',
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
  ...props
}) => {
  return (
    <button
      className={clsx(
        'food-btn rounded-btn font-primary font-semibold transition-all duration-200',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
