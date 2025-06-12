import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/Layout';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationError, setValidationError] = useState('');
  const { register, registerMutation } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    if (password !== confirmPassword) {
      setValidationError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setValidationError('Password must be at least 6 characters');
      return;
    }

    try {
      await register(username, password);
      navigate('/');
    } catch (err) {
      // Error is handled by the mutation
    }
  };

  const error = validationError || (registerMutation.error instanceof Error ? registerMutation.error.message : null);

  return (
    <Layout>
      <h2>Register</h2>
      <form className="create_review" onSubmit={handleSubmit}>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        
        <label htmlFor="username">Username:</label>
        <input 
          type="text" 
          id="username" 
          placeholder="Username" 
          required
          minLength={2}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={registerMutation.isPending}
        />

        <label htmlFor="password">Password:</label>
        <input 
          type="password" 
          id="password" 
          placeholder="Password" 
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={registerMutation.isPending}
        />

        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input 
          type="password" 
          id="confirmPassword" 
          placeholder="Confirm Password" 
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={registerMutation.isPending}
        />

        <button type="submit" disabled={registerMutation.isPending}>
          {registerMutation.isPending ? 'Registering...' : 'Register'}
        </button>
        
        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </form>
    </Layout>
  );
}