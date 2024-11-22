"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Signup.module.css';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    // Perform sign-up logic here
    console.log('New user signed up:', { name, username, password });
    setName('');
    setUsername('');
    setPassword('');
    router.push('/dashboard'); // Redirect to dashboard or another page
  };

  const backToLoginHandler = () => {
    router.push('/'); // Redirect to login page
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>Sign Up</h1>
        <form onSubmit={submitHandler}>
          <input
            className={styles.input}
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
