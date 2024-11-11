    // src/app/dashboard/Dashboard.tsx
    "use client";

    import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./Dashboard.module.css";

    export default function Dashboard() {
    const [games, setGames] = useState([
        {
        title: "Game title",
        description: "Here will be the game review and any additional information the user wants to include.",
        },
        {
        title: "Game title",
        description: "Here will be the game review and any additional information the user wants to include.",
        },
    ]);

    const router = useRouter();

    const handleLogout = () => {
        router.push("/");
    };

    const handleLogNewGame = () => {
        router.push("/log-game");
    };

    return (
        <div className={styles.dashboardContainer}>
        <header className={styles.header}>
            <h1 className={styles.title}>Pixel Pulse</h1>
            <button className={styles.logoutButton} onClick={handleLogout}>
            Log out
            </button>
        </header>

        <button className={styles.newGameButton} onClick={handleLogNewGame}>
            Log new game +
        </button>

        <section className={styles.gamesSection}>
            <h2 className={styles.gamesTitle}>My Games</h2>
            <div className={styles.gamesContainer}>
            {games.map((game, index) => (
                <div key={index} className={styles.gameCard}>
                <h3 className={styles.gameTitle}>{game.title}</h3>
                <p className={styles.gameDescription}>{game.description}</p>
                <div className={styles.actions}>
                    <span className={styles.editButton}>edit</span>
                    <span className={styles.deleteButton}>🗑️</span>
                </div>
                </div>
            ))}
            </div>
        </section>
        </div>
    );
    }
