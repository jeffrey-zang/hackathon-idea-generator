import { Configuration, OpenAIApi } from "openai";

const key = process.env.OPENAI_API_KEY

const configuration = new Configuration({
  apiKey: key,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion({
    model: "text-curie-001",
    prompt: generatePrompt(req.body.theme),
    temperature: 1,
    max_tokens: 400,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(theme) {
  return `Give me one hackathon project idea themed around ${theme}. Be sure to only give one idea!!!

  Theme: time
  idea: A tool that helps people plan and manage their schedules, including features for setting goals and tracking progress.
  
  Theme: farming
  idea: An app that helps farmers plan and optimize their crop production, using data on weather, soil conditions, and market demand to make informed decisions. The app could include tools for tracking and analyzing production data, as well as resources for improving efficiency and profitability.

  Theme: ${theme}
  idea: 
`;
}
