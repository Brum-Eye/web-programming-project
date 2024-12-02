"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./LogGame.module.css";

export default function LogGame() {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title || !rating || !review || !image) {
      setError("Please fill in all fields and upload an image.");
      return;
    }

    try {
      // Convert the image file to Base64
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onloadend = async () => {
        const photoBase64 = reader.result;

        const response = await fetch("/api/logGame", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            photo: photoBase64, 
            stars: rating,
            review,
          }),
        });

        if (response.ok) {
          setTitle("");
          setRating(0);
          setReview("");
          setImage(null);
          router.push("/dashboard");
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Error adding game");
        }
      };
    } catch (err) {
      console.error("Error submitting game:", err);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  return (
    <div className={styles.pageBackground}>
      <div className={`${styles.logGameContainer} pixelated-text`}>
        <h1 className={styles.title}>Add New Game</h1>
        {error && <p className={styles.errorMessage}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className={styles.formField}>
            <label htmlFor="title" className={styles.label}>
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title here"
              className={styles.inputField}
            />
          </div>

          <div className={styles.formField}>
            <label htmlFor="image" className={styles.label}>
              Photo
            </label>
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
              <img
                src={URL.createObjectURL(image)}
                alt="Game Image"
                className={styles.previewImage}
              />
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
            <label htmlFor="review" className={styles.label}>
              Review
            </label>
            <textarea
              id="review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Leave review here"
              className={styles.inputField}
              rows={4}
            ></textarea>
          </div>

          <button type="submit" className={styles.submitButton}>
            Add Game
          </button>
        </form>
      </div>
    </div>
  );
}
