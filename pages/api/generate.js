import { Configuration, OpenAIApi } from "openai";

const key = process.env.OPENAI_API_KEY

const configuration = new Configuration({
  apiKey: key,
});
const openai = new OpenAIApi(configuration);

const amonguses = [
  "A game mode where players can customize their own character with different skins, hats, and outfits.",
  "A tool that allows players to design their own Among Us maps, with custom tasks and layouts.",
  "Design a virtual reality version of Among Us that allows players to fully immerse themselves in the game.",
  "Build a platform that allows players to host and organize their own Among Us tournaments, with support for custom rules and brackets.",
  "Develop a tool that analyzes gameplay data from Among Us matches and generates insights and recommendations for improvement.",
  "Create an educational version of Among Us that teaches players about teamwork, communication, and problem-solving through gameplay.",
  "You sus"
]

export default async function (req, res) {
  if (req.body.theme == 'among us') {
    res.status(200).json({ result: amonguses[Math.floor(Math.random()*amonguses.length)] });
  }
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
