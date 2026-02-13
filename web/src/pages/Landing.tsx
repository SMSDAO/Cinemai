import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';

export const Landing: React.FC = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        background: 'linear-gradient(135deg, #050510 0%, #0A0A1F 50%, #050814 100%)',
      }}
    >
      {/* Hero Section */}
      <div
        style={{
          textAlign: 'center',
          maxWidth: '800px',
          marginBottom: '3rem',
        }}
      >
        <h1
          style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 700,
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, #00F0FF 0%, #FF2EF5 50%, #6B4CFF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          CinemAi Neo
        </h1>
        <p
          style={{
            fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
            color: '#E5E5E5',
            marginBottom: '2rem',
            lineHeight: 1.6,
          }}
        >
          Create cinematic AI content with the power of Neo technology
        </p>
        <p
          style={{
            fontSize: '1rem',
            color: '#A0A0A0',
            marginBottom: '3rem',
            lineHeight: 1.6,
          }}
        >
          Transform your ideas into stunning productions and shorts with AI-powered creativity.
          Join the future of content creation.
        </p>
      </div>

      {/* CTA Buttons */}
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <Link to="/signup" style={{ textDecoration: 'none', minWidth: '180px' }}>
          <Button variant="primary">
            Get Started
          </Button>
        </Link>
        <Link to="/login" style={{ textDecoration: 'none', minWidth: '180px' }}>
          <Button variant="secondary">
            Login
          </Button>
        </Link>
      </div>

      {/* Features */}
      <div
        style={{
          marginTop: '5rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          maxWidth: '1000px',
          width: '100%',
        }}
      >
        {[
          {
            icon: '🎬',
            title: 'Productions',
            description: 'Create cinematic masterpieces with AI-powered production tools',
          },
          {
            icon: '🎞',
            title: 'Shorts',
            description: 'Generate engaging short-form content in multiple formats',
          },
          {
            icon: '📱',
            title: 'Timeline',
            description: 'Stay connected with your creative community',
          },
        ].map((feature, idx) => (
          <div
            key={idx}
            style={{
              padding: '2rem',
              background: 'rgba(255, 255, 255, 0.02)',
              borderRadius: '12px',
              border: '1px solid rgba(0, 240, 255, 0.2)',
              textAlign: 'center',
              transition: 'all 0.3s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.border = '1px solid rgba(0, 240, 255, 0.5)';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 240, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.border = '1px solid rgba(0, 240, 255, 0.2)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{feature.icon}</div>
            <h3 style={{ color: '#00F0FF', marginBottom: '0.5rem', fontSize: '1.25rem' }}>
              {feature.title}
            </h3>
            <p style={{ color: '#A0A0A0', fontSize: '0.95rem' }}>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
