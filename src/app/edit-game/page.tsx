"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation'; // useSearchParams hook from next/navigation
import styles from "./EditGame.module.css";

export default function EditGame() {
  const [title, setTitle] = useState<string>(""); // Ensure it starts as an empty string
  const [rating, setRating] = useState<number>(0); // Ensure it starts as 0
  const [review, setReview] = useState<string>(""); // Ensure it starts as an empty string
  const [image, setImage] = useState<string | null>(null); // Ensure it starts as null
  const [existingPhoto, setExistingPhoto] = useState<string | null>(null); // Ensure it starts as null
  const searchParams = useSearchParams();
  const id = searchParams ? searchParams.get("id") : null;

  useEffect(() => {
    const fetchGameData = async () => {
      if (id) {
        try {
          const response = await fetch(`/api/logGame?id=${id}`);
          if (response.ok) {
            const game = await response.json();
            setTitle(game.title || ""); // Ensure it's always a string
            setRating(game.stars || 0); // Ensure it's always a number
            setReview(game.review || ""); // Ensure it's always a string
            setExistingPhoto(game.photo || null); // Ensure it's either string or null
          } else {
            alert("Game not found");
          }
        } catch (error) {
          console.error("Error fetching game data:", error);
        }
      }
    };

    if (id) {
      fetchGameData();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedGame = { title, stars: rating, review, photo: image || existingPhoto };
    console.log("Updated game:", updatedGame);

    try {
      const response = await fetch(`/api/logGame?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedGame),
      });

      if (response.ok) {
        alert("Game updated successfully!");
        window.location.href = "/dashboard";
      } else {
        const data = await response.json();
        alert(data.message || "Failed to update game");
      }
    } catch (error) {
      console.error("Error updating game:", error);
      alert("Error updating game");
    }
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className={styles.pageBackground}>
      <div className={`${styles.logGameContainer} pixelated-text`}>
        <h1 className={styles.title}>Edit Game</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.formField}>
            <label htmlFor="title" className={styles.label}>Title</label>
            <input
              id="title"
              type="text"
              value={title || ""} // Ensure it’s always a string
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title here"
              className={styles.inputField}
            />
          </div>

          <div className={styles.formField}>
            <label htmlFor="image" className={styles.label}>Photo</label>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImage}
              className={styles.inputField}
            />
          </div>
          {image && (
            <div className={styles.imagePreview}>
              <img src={image} alt="Game Image" className={styles.previewImage} />
            </div>
          )}
          {existingPhoto && !image && (
            <div className={styles.imagePreview}>
              <img src={existingPhoto} alt="Existing Game Image" className={styles.previewImage} />
            </div>
          )}

          <div className={styles.formField}>
            <label className={styles.label}>Star Rating</label>
            <div className={styles.starRating}>
              {Array.from({ length: 5 }).map((_, index) => (
                <span
                  key={index}
                  onClick={() => setRating(index + 1)}
                  style={{
                    cursor: "pointer",
                    fontSize: "1.5rem",
                    color: index < rating ? "#FFD700" : "#ccc",
                  }}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          <div className={styles.formField}>
            <label htmlFor="review" className={styles.label}>Review</label>
            <textarea
              id="review"
              value={review || ""} // Ensure it's always a string
              onChange={(e) => setReview(e.target.value)}
              placeholder="Leave review here"
              className={styles.inputField}
              rows={4}
            ></textarea>
          </div>

          <button type="submit" className={styles.submitButton}>
            Update Game
          </button>
        </form>
      </div>
    </div>
  );
}
