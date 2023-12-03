import { CohereClient } from "cohere-ai";

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

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
  try {
    const { theme } = req.body;
    
    if (theme.toLowerCase() == 'among us') {
      res.status(200).json({ result: amonguses[Math.floor(Math.random()*amonguses.length)] });
    }  
    
    const response = await cohere.generate({
      model: "command-nightly",
      prompt: `Generate one, singular, unique, innovative idea for a hackathon project based on this theme: ${theme}. Do not include extra dialogue text. Simply state the idea and explain it. Nothing else. Do not put extra formatting such as markdown. Do not use lists. Just one simple idea and explanation.`,
      max_tokens: 50,
      temperature: 0.8,
      k: 0,
      p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      stop_sequences: ["--"],
      return_likelihoods: "NONE",
    });

    res.status(200).json({ summary: response.generations[0].text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
}