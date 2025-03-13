

import styled, { css } from 'styled-components';
import React from 'react';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: boolean;
  helperText?: string;
  checkboxSize?: 'small' | 'medium' | 'large';
}

const CheckboxContainer = styled.div<{ error?: boolean }>`
  display: inline-flex;
  align-items: center;
  position: relative;
  cursor: pointer;
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const StyledCheckbox = styled.div<{ checked?: boolean; disabled?: boolean; checkboxSize?: string; error?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: ${props => (props.checked ? '#3182ce' : 'white')};
  border: ${props => (props.error ? '2px solid #e53e3e' : props.checked ? '2px solid #3182ce' : '2px solid #cbd5e0')};
  border-radius: 4px;
  transition: all 0.2s ease;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  opacity: ${props => (props.disabled ? 0.6 : 1)};
  
  ${props => props.checkboxSize === 'small' && css`
    width: 16px;
    height: 16px;
  `}
  
  ${props => (props.checkboxSize === 'medium' || !props.checkboxSize) && css`
    width: 20px;
    height: 20px;
  `}
  
  ${props => props.checkboxSize === 'large' && css`
    width: 24px;
    height: 24px;
  `}
  
  &:hover {
    border-color: ${props => (props.disabled ? '#cbd5e0' : props.error ? '#e53e3e' : '#3182ce')};
  }
  
  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.2);
  }
`;

const CheckIcon = styled.svg<{ checkboxSize?: string }>`
  fill: none;
  stroke: white;
  stroke-width: 2px;
  
  ${props => props.checkboxSize === 'small' && css`
    width: 10px;
    height: 10px;
  `}
  
  ${props => (props.checkboxSize === 'medium' || !props.checkboxSize) && css`
    width: 12px;
    height: 12px;
  `}
  
  ${props => props.checkboxSize === 'large' && css`
    width: 14px;
    height: 14px;
  `}
`;

const Label = styled.label<{ disabled?: boolean }>`
  margin-left: 8px;
  font-size: 1rem;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  opacity: ${props => (props.disabled ? 0.6 : 1)};
`;

const HelperText = styled.span<{ error?: boolean }>`
  font-size: 0.75rem;
  margin-top: 4px;
  margin-left: 28px;
  display: block;
  
  ${props => props.error && css`
    color: #e53e3e;
  `}
`;

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, checked, disabled, error, helperText, checkboxSize = 'medium', className, onChange, ...props }, ref) => {
    const handleClick = () => {
        if(!disabled && onChange) {
            //チェックボックスがクリックされたときにonChangeを呼び出す
            onChange({ target: { checked: !checked } } as React.ChangeEvent<HTMLInputElement>);
        }
    };

    return (
      <div className={className}>
        <CheckboxContainer error={error} onClick={handleClick}>
          <HiddenCheckbox
            ref={ref}
            checked={checked}
            disabled={disabled}
            onChange={onChange}
            {...props}
          />
          <StyledCheckbox
            checked={checked}
            disabled={disabled}
            checkboxSize={checkboxSize}
            error={error}
          >
            {checked && (
              <CheckIcon checkboxSize={checkboxSize} viewBox="0 0 24 24">
                <polyline points="20 6 9 17 4 12" />
              </CheckIcon>
            )}
          </StyledCheckbox>
          {label && <Label disabled={disabled}>{label}</Label>}
        </CheckboxContainer>
        {helperText && <HelperText error={error}>{helperText}</HelperText>}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';