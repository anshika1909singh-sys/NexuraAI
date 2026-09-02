import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed. Use POST.",
    });
  }

  try {
    // Check that the API key exists on the server
    if (!process.env.GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY is not configured.");

      return res.status(500).json({
        success: false,
        message: "Gemini API key is not configured.",
      });
    }

    const { domain, level, numQuestions } = req.body || {};

    // Validate required fields
    if (!domain || !level || !numQuestions) {
      return res.status(400).json({
        success: false,
        message:
          "domain, level, and numQuestions are required.",
      });
    }

    const questionCount = Number(numQuestions);

    // Validate question count
    if (
      !Number.isInteger(questionCount) ||
      questionCount < 1 ||
      questionCount > 50
    ) {
      return res.status(400).json({
        success: false,
        message:
          "numQuestions must be an integer between 1 and 50.",
      });
    }

    // Create Gemini client on the server
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const prompt = `
You are an expert technical assessment designer for Nexura AI.

Generate exactly ${questionCount} multiple-choice questions.

Assessment details:

Domain: ${domain}
Difficulty: ${level}

Requirements:

1. Every question must be directly relevant to ${domain}.
2. Every question must match the ${level} difficulty.
3. Each question must have exactly 4 answer options.
4. Only ONE option must be correct.
5. Do not use "All of the above".
6. Do not use "None of the above".
7. Do not create duplicate questions.
8. Questions should test practical technical understanding.
9. Include the technical skill being tested.
10. Include a concise explanation of the correct answer.
11. The "correct" field must contain the zero-based index
    of the correct option.
12. Make the questions clear and suitable for a technical
    skill assessment.
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",

      contents: prompt,

      config: {
        responseMimeType: "application/json",

        responseSchema: {
          type: "object",

          properties: {
            questions: {
              type: "array",

              items: {
                type: "object",

                properties: {
                  question: {
                    type: "string",
                  },

                  options: {
                    type: "array",

                    items: {
                      type: "string",
                    },
                  },

                  correct: {
                    type: "integer",
                  },

                  skill: {
                    type: "string",
                  },

                  explanation: {
                    type: "string",
                  },
                },

                required: [
                  "question",
                  "options",
                  "correct",
                  "skill",
                  "explanation",
                ],
              },
            },
          },

          required: ["questions"],
        },
      },
    });

    // Convert Gemini's response into JavaScript
    const generatedData = JSON.parse(response.text);

    // Validate response structure
    if (
      !generatedData.questions ||
      !Array.isArray(generatedData.questions)
    ) {
      throw new Error(
        "Gemini returned an invalid question structure."
      );
    }

    // Validate every generated question
    const validQuestions =
      generatedData.questions.filter((question) => {
        return (
          typeof question.question === "string" &&
          Array.isArray(question.options) &&
          question.options.length === 4 &&
          question.options.every(
            (option) => typeof option === "string"
          ) &&
          Number.isInteger(question.correct) &&
          question.correct >= 0 &&
          question.correct <= 3 &&
          typeof question.skill === "string" &&
          typeof question.explanation === "string"
        );
      });

    // Make sure Gemini generated enough valid questions
    if (validQuestions.length < questionCount) {
      throw new Error(
        `Only ${validQuestions.length} valid questions were generated.`
      );
    }

    // Return exactly the requested number
    return res.status(200).json({
      success: true,

      questions: validQuestions.slice(
        0,
        questionCount
      ),

      domain,
      level,
    });
  } catch (error) {
    console.error(
      "Assessment generation error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to generate assessment questions.",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : undefined,
    });
  }
}