    // Signup.tsx
    "use client";
    import { useState } from 'react';
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
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault();

        const newUser = {
        id: Math.random(),
        name,
        username,
        email,
        password,
        };

        if (onAddUser) onAddUser(newUser);

        // Reset input fields after submission
        setName('');
        setUsername('');
        setEmail('');
        setPassword('');
    };

    return (
        <div className={styles.container}>
        <div className={styles.formWrapper}>
            <h1 className={styles.title}>Signup</h1>
            <form onSubmit={submitHandler}>
            <input
                className={styles.input}
                type="text"
                placeholder="Name"
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
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                className={styles.input}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className={styles.button}>Sign Up</button>
            </form>
        </div>
        </div>
    );
    }
