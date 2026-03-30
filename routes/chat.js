import express from "express";

const router = express.Router();

// The app now uses the built-in local tutor directly in the client.
// This route remains as a harmless stub so backend calls won't fail.
router.post("/", (req, res) => {
  const { messages } = req.body || {};
  const lastUserMessage = Array.isArray(messages) && messages.length > 0
    ? messages[messages.length - 1]?.content
    : null;

  const replyLines = [
    "👋 Server AI is disabled here (no Google/Gemini).",
    "Use the built-in JavaMaster tutor in the app UI—no API keys needed.",
    lastUserMessage ? `You said: \"${lastUserMessage}\".` : "Ask a Java question to get a response."
  ];

  return res.json({ reply: replyLines.join("\n") });
});

export default router;
