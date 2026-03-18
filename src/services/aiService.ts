import { Grade } from "../types";

export const askMathGuru = async (userMessage: string, grade: Grade = '6eme') => {
  return "Je suis l'assistant MathOS. Comment puis-je t'aider ?";
};

export const explainMathError = async (question: string, wrongAnswer: string | number, correctAnswer: string | number) => {
  return `La bonne réponse était ${correctAnswer}.`;
};
