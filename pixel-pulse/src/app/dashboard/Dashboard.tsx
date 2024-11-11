// Dashboard.tsx
"use client";

import Link from 'next/link';
import { useState } from 'react';
import styles from './Dashboard.module.css';

export default function Dashboard() {
    // Set the initial state for isLoggedIn (true means the user is "logged in")
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    // Sample items to display on the dashboard
    const [games, setGames] = useState([
        { title: "Game title", description: "Here will be the game review and any additional information the user wants to include." },
        { title: "Game title", description: "Here will be the game review and any additional information the user wants to include." },
    ]);

    return (
        <div className={styles.dashboardContainer}>
            {isLoggedIn ? (
                <>
                    {/* Header with Title and Logout Button */}
                    <header className={styles.header}>
                        <h1 className={`pixelated-text ${styles.title}`}>Pixel Pulse</h1>
                        {/* Link for Logout that redirects to the Home page */}
                        <Link href="/" className={`pixelated-text ${styles.logoutButton}`}>
                            Log out
                        </Link>
                    </header>

                    {/* Button to Add a New Game */}
                    <Link href="/log-game" className={`pixelated-text ${styles.newGameButton}`}>
                        Log new game +
                    </Link>

                    {/* Games List Section */}
                    <section className={styles.gamesSection}>
                        <h2 className={`pixelated-text ${styles.gamesTitle}`}>My Games</h2>
                        <div className={styles.gamesContainer}>
                            {games.map((game, index) => (
                                <div key={index} className={styles.gameCard}>
                                    <h3 className={`pixelated-text ${styles.gameTitle}`}>{game.title}</h3>
                                    <p className={styles.gameDescription}>{game.description}</p>
                                    <div className={styles.actions}>
                                        <span className={`pixelated-text ${styles.editButton}`}>edit</span>
                                        <span className={`pixelated-text ${styles.deleteButton}`}>🗑️</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </>
            ) : (
                <p className={`pixelated-text ${styles.notLoggedInMessage}`}>You are not logged in. Please log in to view your games.</p>
            )}
        </div>
    );
}
