/**
 * Mistral AI Client Configuration
 *
 * Centralized Mistral client used by all AI generation steps.
 * Uses OpenAI SDK with Mistral's OpenAI-compatible base URL.
 *
 * Usage Pattern:
 * - Import this client in all AI generation functions
 * - Wrap calls with step.ai.wrap() for Inngest observability
 * - Use response_format: { type: "json_object" } for structured responses
 *
 * Environment:
 * - Requires MISTRAL_API_KEY environment variable
 * - Configure in Vercel/Inngest dashboard
 *
 * Models Used:
 * - mistral-large-latest: High quality, capable model for content generation
 */
import OpenAI from "openai";

export const mistral = new OpenAI({
  apiKey: process.env.MISTRAL_API_KEY,
  baseURL: "https://api.mistral.ai/v1",
});
