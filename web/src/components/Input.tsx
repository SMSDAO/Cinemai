import React from 'react';

interface InputProps {
  label?: string;
  type?: 'text' | 'email' | 'password' | 'textarea';
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  disabled = false,
}) => {
  const baseStyles: React.CSSProperties = {
    width: '100%',
    padding: '0.75rem',
    background: 'rgba(255, 255, 255, 0.05)',
    border: `1px solid ${error ? '#FF4444' : 'rgba(0, 240, 255, 0.2)'}`,
    borderRadius: '8px',
    color: '#E5E5E5',
    fontSize: '1rem',
    outline: 'none',
    transition: 'all 0.2s',
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div style={{ width: '100%' }}>
      {label && (
        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#E5E5E5', fontSize: '0.875rem', fontWeight: 500 }}>
          {label}
        </label>
      )}
      {type === 'textarea' ? (
        <textarea
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          style={{ ...baseStyles, minHeight: '120px', resize: 'vertical', fontFamily: 'inherit' }}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          style={baseStyles}
        />
      )}
      {error && (
        <div style={{ marginTop: '0.5rem', color: '#FF4444', fontSize: '0.875rem' }}>
          {error}
        </div>
      )}
    </div>
  );
};
