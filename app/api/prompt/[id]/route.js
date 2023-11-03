import Prompt from "@model/prompt";
import { connectDb } from "@utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectDb();

    const prompt = await Prompt.findById(params.id).populate("creator");

    if (!prompt) return new Response("prompt Not found", { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (err) {
    return new Response("internal Server Error", { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();

  try {
    await connectDb();

    const existingPrompt = await Prompt.findById(params.id);
    if (!existingPrompt) {
      return new Response("prompt not found", { status: 404 });
    }

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response("succefully updated the prompts", { status: 200 });
  } catch (err) {
    return new Response("prompt not found");
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await connectDb();
    await Prompt.findByIdAndRemove(params.id);

    return new Response("Prompt deleted succesfully", { status: 200 });
  } catch (err) {
    return new Response("Error deleting prompt", { status: 500 });
  }
};
