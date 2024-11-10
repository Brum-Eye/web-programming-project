    "use client";
    import React, { useState } from 'react';
import styles from './Login.module.css';

    export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle login logic here
        console.log('Logging in:', { username, password });
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
