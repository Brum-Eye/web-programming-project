"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Signup.module.css';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prepare user data
    const userData = { email, username, password };

    try {
      // Send a POST request to the backend to create a new user
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        // Clear the form
        setEmail('');
        setUsername('');
        setPassword('');
        
        // Redirect to the dashboard
        router.push('/dashboard');
      } else {
        const result = await response.json();
        setError(result.message || 'Error creating user');
      }
    } catch (error) {
      setError('An unexpected error occurred.');
      console.error(error);
    }
  };

  const backToLoginHandler = () => {
    router.push('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>Sign Up</h1>
        <form onSubmit={submitHandler}>
          <input
            className={styles.input}
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className={styles.input}
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <div className={styles.error}>{error}</div>}
          <button type="submit" className={styles.button}>
            Sign Up
          </button>
        </form>
        <button onClick={backToLoginHandler} className={styles.backButton}>
          Back to Login
        </button>
      </div>
    </div>
  );
}
