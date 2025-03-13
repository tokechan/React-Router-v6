import React from "react";

type ButtonProps = {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'danger';
    size?: 'small' | 'medium' | 'large';
    onClick?: () => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({
    children,
    onClick,
    variant = 'primary',
    size = 'medium',
    disabled = false
}) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`button button--${variant} button--${size}`}
        >
            {children}
        </button>
    );
};
