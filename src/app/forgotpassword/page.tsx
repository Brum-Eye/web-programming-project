"use client";
import { useState } from 'react';
import styles from './ForgotPassword.module.css';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <img
          src="/images/pixel-pulse-logo.png"
          alt="Pixel Pulse Logo"
          className={styles.logo}
        />
        <h1 className={styles.title}>Forgot Password</h1>
        <form>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
          <input
            type="text"
            placeholder="Enter verification code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={styles.input}
          />
          <button type="button" className={styles.button}>
            Reset Password
          </button>
        </form>
        <button className={styles.backButton} onClick={() => history.back()}>
          Back to Login
        </button>
      </div>
    </div>
  );
}
