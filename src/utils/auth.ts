import jwt, { JwtPayload } from "jsonwebtoken";

// Define the secret key (ensure this is securely stored in environment variables)
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

// Function to generate a JWT token for a user
export const generateToken = (user: { id: string; username: string }): string => {
  return jwt.sign(
    { id: user.id, username: user.username }, 
    JWT_SECRET, 
    { expiresIn: "1h" } // Token expires in 1 hour
  );
};

// Function to verify the JWT token and return decoded payload or null if invalid
export const verifyToken = (token: string): JwtPayload | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    // If the decoded value is a string (unlikely for a valid JWT), return null
    if (typeof decoded === "string") {
      return null;
    }

    return decoded; // Return the decoded payload (JwtPayload object)
  } catch (error) {
    return null; // Return null if the token is invalid or expired
  }
};
