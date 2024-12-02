import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = '33284af0ba6692cf71f0d469284a20f78a886b72a2268e07c067f1e036cef185';

export const generateToken = (user: { id: string; username: string }): string => {
  return jwt.sign(
    { id: user.id, username: user.username }, 
    JWT_SECRET, 
    { expiresIn: "1h" } 
  );
};

export const verifyToken = (token: string): JwtPayload | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (typeof decoded === "string") {
      return null;
    }

    return decoded; 
  } catch (error) {
    return null; 
  }
};
