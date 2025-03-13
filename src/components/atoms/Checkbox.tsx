import React from "react";


type CheckBox = {
    checked: boolean;
    onChange: () => void;
    label?: string;
    id?: string;
    disabled?: boolean;
    className?: string;
};

export const CheckBox: React.FC<CheckBox> = ({
    checked,
    onChange,
    label,
    id,
    disabled = false,
    className = '',
}) => {
    const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

    return (
        <div className={`checkbox-container ${className}`}>
            <input 
                type="checkbox"
                id={checkboxId}
                checked={checked}
                onChange={onChange}
                disabled={disabled}
                className="checkbox"
            />
            {label && (
                <label 
                    htmlFor={checkboxId}
                    className={`checkbox-label ${disabled ? 'checkbox-label--disabled' : ''}`}
                >
                    {label}
                </label>
            )}
        </div>
    );
};