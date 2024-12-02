"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import styles from "./Dashboard.module.css";

// Define the Game type
interface Game {
  _id: string;
  title: string;
  photo: string;
  stars: number;
  review: string;
}

export default function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [games, setGames] = useState<Game[]>([]); 
  const router = useRouter();

  // Check if user is logged in when page loads
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
      if (token) {
        try {
          const response = await fetch("/api/auth/status", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setIsLoggedIn(data.isLoggedIn); // Update auth status
          } else {
            setIsLoggedIn(false);
          }
        } catch (error) {
          console.error("Error checking auth status:", error);
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(false);
      }
    };

    checkAuth();
  }, []);

  // Fetch games from the API when logged in
  useEffect(() => {
    const fetchGames = async () => {
      const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
      if (!token) {
        return;
      }

      try {
        const response = await fetch("/api/logGame", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

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

    if (isLoggedIn) {
      fetchGames();
    }
  }, [isLoggedIn]);

  // Delete game function
  const deleteGame = async (id: string) => {
    const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    if (!token) {
      alert("You need to log in to delete games.");
      return;
    }

    try {
      const response = await fetch(`/api/logGame?id=${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
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

  // Logout function
  const handleLogout = () => {
    // Clear token from localStorage/sessionStorage
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");

    // Redirect to login page
    router.push("/");
  };

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.header}>
        <h1 className={`pixelated-text ${styles.title}`}>Pixel Pulse</h1>
        <button
          className={`pixelated-text ${styles.logoutButton}`}
          onClick={handleLogout}
        >
          {isLoggedIn ? "Log out" : "Log in"}
        </button>
      </header>

      {isLoggedIn ? (
        <>
          <Link
            href="/log-game"
            className={`pixelated-text ${styles.newGameButton}`}
          >
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

                    {/* Display star rating */}
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
                      <Link
                        href={`/edit-game?id=${game._id}`}
                        className={`pixelated-text ${styles.editButton}`}
                      >
                        Edit
                      </Link>
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
        </>
      ) : (
        <p className={`pixelated-text ${styles.notLoggedInMessage}`}>
          You are not logged in. Please log in to view and manage your games.
        </p>
      )}
    </div>
  );
}
