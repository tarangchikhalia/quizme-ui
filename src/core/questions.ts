import { ChatOpenAI } from "@langchain/openai";
import type { Question } from '../types/Questions';

interface RawQuestionResponse {
  question: string;
  options: string[];
  answer: number;
}

const SYSTEM_PROMPT = `
  You are a highly specialized and expert Quiz Question Generator. 
  Your primary function is to create challenging, unique, and well-formed multiple-choice questions (MCQs) 
  based strictly on the user-provided topic and difficulty level.
  
  # Core Directives
  Format Adherence (Strict): You must return exactly 10 quiz questions in a single, well-formed JSON array.
  The JSON structure must strictly follow the schema provided below. 
  Do not include any introductory text, concluding remarks, or explanations outside the JSON block.
  
  # Schema Compliance:
  Each object in the array must contain question, options, and answer.
  
  The options array must contain exactly four (4) unique strings.
  
  The answer value must be an integer (0, 1, 2, or 3) representing the zero-based index of the correct 
  option within the options array.
  
  # Content and Difficulty:
  All questions must be directly relevant to the specified TOPIC.
  
  The complexity, depth of knowledge required, and the subtlety of the incorrect options (distractors) 
  must align with the specified DIFFICULTY LEVEL (e.g., "Beginner", "Intermediate", "Advanced").
  
  The incorrect options (distractors) must be plausible and contextually relevant, not obvious nonsense.
  ` as const;

const EXPECTED_QUESTION_COUNT = 10;
const EXPECTED_OPTIONS_COUNT = 4;

function validateEnvironmentVariables(): void {
  if (!import.meta.env.VITE_OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY environment variable is required');
  }
  if (!import.meta.env.VITE_OPENAI_MODEL_NAME) {
    throw new Error('OPENAI_MODEL_NAME environment variable is required');
  }
}

function createModel(): ChatOpenAI {
  validateEnvironmentVariables();
  return new ChatOpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    modelName: import.meta.env.VITE_OPENAI_MODEL_NAME,
  });
}

function isValidRawQuestion(question: unknown): question is RawQuestionResponse {
  if (typeof question !== 'object' || question === null) {
    return false;
  }

  const q = question as Record<string, unknown>;
  
  return (
    typeof q.question === 'string' &&
    Array.isArray(q.options) &&
    q.options.length === EXPECTED_OPTIONS_COUNT &&
    q.options.every((opt) => typeof opt === 'string') &&
    typeof q.answer === 'number' &&
    q.answer >= 0 &&
    q.answer <= 3
  );
}

function serializeQuestions(questionStr: string): Question[] {
  let parsedData: unknown;
  
  try {
    parsedData = JSON.parse(questionStr);
  } catch (error) {
    throw new Error(`Failed to parse JSON response: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }

  if (!Array.isArray(parsedData)) {
    throw new Error('Response must be an array of questions');
  }

  if (parsedData.length !== EXPECTED_QUESTION_COUNT) {
    throw new Error(`Expected ${EXPECTED_QUESTION_COUNT} questions, but received ${parsedData.length}`);
  }

  const questions: Question[] = [];
  
  for (let i = 0; i < parsedData.length; i++) {
    const rawQuestion = parsedData[i];
    
    if (!isValidRawQuestion(rawQuestion)) {
      throw new Error(`Invalid question format at index ${i}`);
    }

    questions.push({
      question: rawQuestion.question,
      options: rawQuestion.options,
      correct: rawQuestion.answer,
    });
  }

  return questions;
}

/**
 * Generates quiz questions using OpenAI based on the specified topic and difficulty.
 * 
 * @param topic - The subject matter for the quiz questions
 * @param difficulty - The difficulty level (e.g., "Beginner", "Intermediate", "Advanced")
 * @returns A promise that resolves to an array of Question objects
 * @throws Error if environment variables are missing, API call fails, or response is invalid
 */
export async function getQuestions(topic: string, difficulty: string): Promise<Question[]> {
  if (!topic || topic.trim().length === 0) {
    throw new Error('Topic parameter is required and cannot be empty');
  }

  if (!difficulty || difficulty.trim().length === 0) {
    throw new Error('Difficulty parameter is required and cannot be empty');
  }

  const model = createModel();

  try {
    const aiMessage = await model.invoke([
      {
        role: "system",
        content: SYSTEM_PROMPT,
      },
      {
        role: "user",
        content: `Topic: ${topic}, Difficulty: ${difficulty}`
      },
    ]);

    if (!aiMessage.content) {
      throw new Error('Received empty response from AI model');
    }

    const contentStr = typeof aiMessage.content === 'string' 
      ? aiMessage.content 
      : JSON.stringify(aiMessage.content);

    return serializeQuestions(contentStr);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to generate questions: ${error.message}`);
    }
    throw new Error('Failed to generate questions: Unknown error occurred');
  }
}
