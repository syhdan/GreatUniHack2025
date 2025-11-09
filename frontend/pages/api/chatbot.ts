import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const response = await axios.post(
      "https://genmini-api.example.com/v1/complete",
      req.body,
      {
        headers: {
          Authorization: `Bearer ${process.env.GEMINI_API_KEY}`, // Use the API key from the environment variable
          "Content-Type": "application/json",
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("AxiosError:", error.message);
      res.status(error.response?.status || 500).json({ error: error.response?.data || "Failed to fetch response." });
    } else {
      console.error("Unexpected error:", error);
      res.status(500).json({ error: "An unexpected error occurred." });
    }
  }
}
