    // LogGame.tsx
    "use client";

    import { useState } from "react";
import styles from "./LogGame.module.css";

    export default function LogGame() {
    const [title, setTitle] = useState("");
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ title, rating, review });
        setTitle("");
        setRating(0);
        setReview("");
    };

    return (
        <div className={styles.pageBackground}>
        <div className={`${styles.logGameContainer} pixelated-text`}>
            <h1 className={styles.title}>Add new game</h1>
            <form onSubmit={handleSubmit}>
            <div className={styles.formField}>
                <label htmlFor="title" className={styles.label}>Title</label>
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
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Leave review here"
                className={styles.inputField}
                rows={4}
                ></textarea>
            </div>

            <button type="submit" className={styles.submitButton}>
                Add game
            </button>
            </form>
        </div>
        </div>
    );
    }
