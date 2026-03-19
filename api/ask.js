// api/ask.js
export default async function handler(req, res) {
  const { prompt } = req.body;
  const HF_TOKEN = process.env.HF_TOKEN; // This stays hidden on the server!

  try {
    const response = await fetch(`https://api-inference.huggingface.co/models/google/gemma-2-9b-it`, {
      headers: { Authorization: `Bearer ${HF_TOKEN}`, "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        inputs: `<start_of_turn>user\nSystem: You are Pioneer OS. Use [CLICK: x,y], [TYPE: text], or [PRESS: key].\n\nUser: ${prompt}<end_of_turn>\n<start_of_turn>model\n`,
      }),
    });

    const result = await response.json();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Brain Connection Failed" });
  }
}
