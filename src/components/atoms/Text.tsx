import React, { ReactNode } from 'react';

type TextVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'caption' | 'button' | 'overline';

export type TextProps = {
  children: ReactNode;
  variant?: TextVariant;
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'default';
  align?: 'left' | 'center' | 'right' | 'justify';
  noWrap?: boolean;
  gutterBottom?: boolean;
  className?: string;
  component?: React.ElementType;
  onClick?: () => void;
};

export const Text: React.FC<TextProps> = ({
  children,
  variant = 'body1',
  color = 'default',
  align = 'left',
  noWrap = false,
  gutterBottom = false,
  className = '',
  component,
  onClick,
  ...props
}) => {
  // マッピングテーブル: variantからHTMLタグへ
  const variantMapping: Record<TextVariant, React.ElementType> = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    h6: 'h6',
    body1: 'p',
    body2: 'p',
    caption: 'span',
    button: 'span',
    overline: 'span',
  };

  // コンポーネントタイプを決定
  const Component = component || variantMapping[variant];

  return (
    <Component
      className={`
        text
        text--${variant}
        text--color-${color}
        text--align-${align}
        ${noWrap ? 'text--nowrap' : ''}
        ${gutterBottom ? 'text--gutter-bottom' : ''}
        ${className}
      `}
      onClick={onClick}
      {...props}
    >
      {children}
    </Component>
  );
};