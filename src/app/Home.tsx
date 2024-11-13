"use client";
import { useRouter } from 'next/navigation';
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
const router = useRouter();

const addUserHandler = (newUser: User) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
    router.push('/dashboard');
};

return (
    <div className={styles.container}>
    <div className={styles.logoContainer}>
        <img
        src="/images/pixel-pulse-logo.png"
        alt="Pixel Pulse Logo"
        className={styles.logo}
        />
    </div>

    <h1 className={`pixelated-text ${styles.title}`}>Welcome to Pixel Pulse</h1>
    <Signup onAddUser={addUserHandler} />
    </div>
);
}