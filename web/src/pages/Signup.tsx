import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { signup } from '../services/api';

export const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate password length
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);

    try {
      await signup(email, password);
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Card>
        <h1 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center', color: '#00F0FF' }}>
          Create Account
        </h1>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit} className="login-form">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="your@email.com"
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="••••••••"
          />
          <Input
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            placeholder="••••••••"
          />
          <Button type="submit" loading={loading}>
            Sign Up
          </Button>
        </form>
        <div style={{ marginTop: '1rem', textAlign: 'center', color: '#E5E5E5' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#00F0FF', textDecoration: 'none' }}>
            Login
          </Link>
        </div>
      </Card>
    </div>
  );
};
