"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Signup.module.css';

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
  const router = useRouter();

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (onAddUser) {
      onAddUser({
        id: Math.random(),
        name: '',
        username,
        email: '',
        password,
      });
    }
    setUsername('');
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
