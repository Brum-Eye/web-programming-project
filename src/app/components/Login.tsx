"use client";

import React, { useState } from 'react';
import styles from './Login.module.css';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Send login request to the backend
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
        
        // Redirect to a dashboard or homepage
        router.push('/dashboard');
      } else {
        const result = await response.json();
        setError(result.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An unexpected error occurred.');
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
          <div className={styles.options}>
            <label className={styles.checkbox}>
              <input type="checkbox" /> Remember Me
            </label>
            <a href="#" style={{ color: '#fff', textDecoration: 'underline' }}>
              Forgot Password?
            </a>
          </div>
          <button type="submit" className={styles.button}>Login</button>
        </form>
      </div>
    </div>
  );
}
