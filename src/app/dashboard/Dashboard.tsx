"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "./Dashboard.module.css";

interface Game {
  _id: string;
  title: string;
  photo: string;
  stars: number;
  review: string;
}

export default function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isGuest, setIsGuest] = useState(false); // Separate state for guest login
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    // Check session storage for login status
    const guestStatus = sessionStorage.getItem("isGuest");
    if (guestStatus === "true") {
      setIsGuest(true);
      setIsLoggedIn(false);
    } else {
      setIsGuest(false);
      setIsLoggedIn(true);
    }

    // Fetch games from the API
    const fetchGames = async () => {
      try {
        const response = await fetch("/api/logGame");
        if (response.ok) {
          const data = await response.json();
          setGames(data);
        } else {
          console.error("Failed to fetch games");
        }
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    fetchGames();
  }, []);

   // Delete game function
   const deleteGame = async (id: string) => {
    try {
      const response = await fetch(`/api/logGame?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Remove the deleted game from the local state
        setGames(games.filter(game => game._id !== id));
      } else {
        const data = await response.json();
        alert(data.message || "Error deleting game");
      }
    } catch (error) {
      alert("Error deleting game");
      console.error("Error:", error);
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.header}>
        <h1 className={`pixelated-text ${styles.title}`}>Pixel Pulse</h1>
        <Link
          href="/"
          className={`pixelated-text ${styles.logoutButton}`}
        >
          {isLoggedIn ? "Log out" : "Log in"}
        </Link>
      </header>

      <Link href="/log-game" className={`pixelated-text ${styles.newGameButton}`}>
        Log new game +
      </Link>

      <section className={styles.gamesSection}>
        <h2 className={`pixelated-text ${styles.gamesTitle}`}>My Games</h2>
        <div className={styles.gamesContainer}>
          {games.length > 0 ? (
            games.map((game) => (
              <div key={game._id} className={styles.gameCard}>
                {game.photo && (
                  <img
                    src={game.photo}
                    alt={`${game.title} image`}
                    className={styles.gameImage}
                  />
                )}
                <h3 className={`pixelated-text ${styles.gameTitle}`}>{game.title}</h3>
                <p className={styles.gameDescription}>{game.review}</p>

                <div className={styles.starRating}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      style={{
                        color: i < game.stars ? "#FFD700" : "#ccc",
                        fontSize: "1.2rem",
                      }}
                    >
                      ★
                    </span>
                  ))}
                </div>

                <div className={styles.actions}>
                  <span className={`pixelated-text ${styles.editButton}`}>edit</span>
                  <span
                    className={`pixelated-text ${styles.deleteButton}`}
                    onClick={() => deleteGame(game._id)}
                  >
                    🗑️
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p>No games found. Log your first game!</p>
          )}
        </div>
      </section>
    </div>
  );
}
