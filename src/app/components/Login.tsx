"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Login.module.css';

interface SignupProps {
  onAddUser?: (user: {
    id: number;
    name: string;
    username: string;
    email: string;
    password: string;
  }) => void;
}

export default function Signup({ onAddUser }: SignupProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);

        // Redirect to dashboard on successful login
        router.push('/dashboard');
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('An error occurred. Please try again later.');
    }

    // Clear the password field after submission
    setPassword('');
  };

  const forgotPasswordHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push('/forgotpassword');
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>Pixel Pulse Login</h1>
        <form onSubmit={submitHandler}>
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
          <div className={styles.options}>
            <label className={styles.checkboxContainer}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span className={styles.checkboxLabel}>Remember Me</span>
            </label>
            <a
              href="#"
              className={styles.forgotPassword}
              onClick={forgotPasswordHandler}
            >
              Forgot Password
            </a>
          </div>

          {errorMessage && <p className={styles.error}>{errorMessage}</p>}

          <button type="submit" className={styles.button}>
            Login
          </button>
        </form>
        <p
          className={styles.signupLink}
          onClick={() => router.push('/signup')}
        >
          Sign Up
        </p>
      </div>
    </div>
  );
}
