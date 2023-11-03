import { connectDb } from "@utils/database";
import Prompt from "@model/prompt";
export const POST = async (req, res) => {
  const { userId, prompt, tag } = await req.json();

  try {
    await connectDb();
    const newPrompt = await Prompt.create({
      creator: userId,
      prompt,
      tag,
    });

    return new Response(JSON.stringify(newPrompt), {
      status: 201,
    });
  } catch (err) {
    return new Response("failed to create a new prompt", { status: 500 });
  }
};
