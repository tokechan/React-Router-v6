import { InputHTMLAttributes, forwardRef } from 'react';

export type InputProps = {
  id?: string;
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
  helperTextClassName?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'className'>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      label,
      error,
      helperText,
      fullWidth = false,
      className = '',
      labelClassName = '',
      inputClassName = '',
      errorClassName = '',
      helperTextClassName = '',
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    
    return (
      <div className={`input-container ${fullWidth ? 'input-container--full-width' : ''} ${className}`}>
        {label && (
          <label 
            htmlFor={inputId}
            className={`input-label ${labelClassName}`}
          >
            {label}
          </label>
        )}
        
        <input
          ref={ref}
          id={inputId}
          className={`input ${error ? 'input--error' : ''} ${inputClassName}`}
          {...props}
        />
        
        {error && (
          <p className={`input-error ${errorClassName}`}>
            {error}
          </p>
        )}
        
        {helperText && !error && (
          <p className={`input-helper-text ${helperTextClassName}`}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';