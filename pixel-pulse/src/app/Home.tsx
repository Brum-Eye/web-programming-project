    // Home.tsx
    "use client";
    import { useState } from 'react';
import styles from './Home.module.css';
import Signup from './components/Signup';

    type User = {
    id: number;
    name: string;
    username: string;
    imageUrl?: string;
    email: string;
    password: string;
    };

    const USERS_INIT: User[] = [
    {
        id: 1,
        name: 'Pixel Pulse',
        username: 'pixelpulse',
        email: 'contact@pixelpulse.com',
        password: 'password',
        imageUrl: '/images/pixel-pulse-logo.png',
    },
    ];

    export default function Home() {
    const [users, setUsers] = useState<User[]>(USERS_INIT);

    // Define the addUserHandler function
    const addUserHandler = (newUser: User) => {
        setUsers((prevUsers) => [...prevUsers, newUser]);
    };

    return (
        <div className={styles.container}>
        {/* Logo displayed at the top of the page */}
        <div className={styles.logoContainer}>
            <img
            src="/images/pixel-pulse-logo.png" // Path to your logo image in the public folder
            alt="Pixel Pulse Logo"
            className={styles.logo}
            />
        </div>

        {/* Welcome message */}
        <h1 className={styles.title}>Welcome to Pixel Pulse</h1>

        {/* Signup component */}
        <Signup onAddUser={addUserHandler} />
        </div>
    );
}
