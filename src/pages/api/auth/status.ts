import { NextApiRequest, NextApiResponse } from "next";
import { verifyToken } from "../../../utils/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ isLoggedIn: false });
  }

  const user = verifyToken(token);

  if (!user) {
    return res.status(401).json({ isLoggedIn: false });
  }

  return res.status(200).json({ isLoggedIn: true });
}
