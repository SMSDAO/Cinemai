import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className }) => {
  const styles: React.CSSProperties = {
    background: 'rgba(26, 26, 36, 0.8)',
    border: '1px solid rgba(0, 240, 255, 0.2)',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 0 20px rgba(0, 240, 255, 0.1)',
    transition: 'all 0.2s',
  };

  return (
    <div style={styles} className={className}>
      {children}
    </div>
  );
};
