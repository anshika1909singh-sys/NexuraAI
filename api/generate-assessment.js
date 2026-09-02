export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      message: "Use GET for this diagnostic test.",
    });
  }

  return res.status(200).json({
    success: true,
    geminiKeyExists: Boolean(process.env.GEMINI_API_KEY),
    geminiKeyLength: process.env.GEMINI_API_KEY
      ? process.env.GEMINI_API_KEY.length
      : 0,
    nodeVersion: process.version,
  });
}