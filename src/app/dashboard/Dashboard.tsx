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

  // Fetch games from the API (for both logged in and non-logged in users)
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch("/api/logGame", {
          method: "GET",
          headers: isLoggedIn
            ? {
                Authorization: `Bearer ${localStorage.getItem("authToken") || sessionStorage.getItem("authToken")}`,
              }
            : {}, // No authorization needed for non-logged in users
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

    fetchGames();
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

  // Log new game function
  const handleLogNewGame = () => {
    const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    if (!token) {
      alert("You need to log in to add a new game.");
      return;
    }
    router.push("/log-game");
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

      {isLoggedIn && (
        <button
          className={`pixelated-text ${styles.newGameButton}`}
          onClick={handleLogNewGame}
        >
          Log new game +
        </button>
      )}

      <section className={styles.gamesSection}>
        <h2 className={`pixelated-text ${styles.gamesTitle}`}>Game Reviews</h2>
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

                {/* Show edit and delete buttons only for logged-in users */}
                {isLoggedIn && (
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
                )}
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
