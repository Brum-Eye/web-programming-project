"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Login.module.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    console.log('Attempting to log in with:', { username, password });

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);

        // Redirect to the dashboard
        router.push('/dashboard');
      } else {
        const errorData = await response.json();
        console.error('Login failed:', errorData.message);
        setError(errorData.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      console.error('Error during login:', err);
      setError('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginWrapper}>
        <img
          src="/images/pixel-pulse-logo.png"
          alt="Pixel Pulse Logo"
          className={styles.logo}
        />
        <h1 className={styles.title}>Pixel Pulse Login</h1>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
          {error && <div className={styles.error}>{error}</div>}
          <button type="submit" className={styles.button}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
