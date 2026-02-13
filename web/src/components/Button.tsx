import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  disabled = false,
  loading = false,
}) => {
  const baseStyles: React.CSSProperties = {
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s',
    width: '100%',
    opacity: disabled || loading ? 0.5 : 1,
  };

  const variantStyles: React.CSSProperties = variant === 'primary'
    ? {
        background: 'linear-gradient(135deg, #00F0FF, #6B4CFF)',
        color: '#0A0A0F',
        boxShadow: '0 0 20px rgba(0, 240, 255, 0.3)',
      }
    : {
        background: 'rgba(0, 240, 255, 0.1)',
        color: '#00F0FF',
        border: '1px solid #00F0FF',
      };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      style={{ ...baseStyles, ...variantStyles }}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
};
