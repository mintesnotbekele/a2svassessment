// src/components/atoms/Input/Input.tsx
import React, { forwardRef } from 'react';
import clsx from 'clsx';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, fullWidth = false, className, id, ...props }, ref) => {
    const inputId = id || props.name;
    const errorId = inputId ? `${inputId}-error` : undefined;

    return (
      <div className={clsx('food-input-wrapper', { 'w-full': fullWidth })}>
        {label && (
          <label
            htmlFor={inputId}
            className="food-input-label block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={clsx(
            'food-input block px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-food-primary focus:border-transparent',
            {
              'w-full': fullWidth,
              'border-gray-300': !error,
              'border-red-500': error,
            },
            className
          )}
          {...props}
        />
        {error && (
          <p id={errorId} className="food-input-error mt-1 text-sm text-red-600">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';