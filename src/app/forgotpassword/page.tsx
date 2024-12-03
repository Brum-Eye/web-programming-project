"use client";
import { useState } from 'react';
import styles from './ForgotPassword.module.css';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/users/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPassword }),
      });

      if (response.ok) {
        setSuccessMessage('Password successfully updated!');
        setErrorMessage('');
      } else {
        const data = await response.json();
        setErrorMessage(data.message || 'An error occurred. Please try again.');
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <img
          src="/images/pixel-pulse-logo.png"
          alt="Pixel Pulse Logo"
          className={styles.logo}
        />
        <h1 className={styles.title}>Forgot Password</h1>
        <form onSubmit={handlePasswordReset}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            Reset Password
          </button>
        </form>
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        {successMessage && <p className={styles.success}>{successMessage}</p>}
        <button className={styles.backButton} onClick={() => history.back()}>
          Back to Login
        </button>
      </div>
    </div>
  );
}
