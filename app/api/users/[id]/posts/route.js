import { connectDb } from "@utils/database";
import Prompt from "@model/prompt";

export const GET = async (request, { params }) => {
  try {
    await connectDb();

    const prompt = await Prompt.find({ creator: params.id }).populate(
      "creator"
    );
    return new Response(JSON.stringify(prompt), {
      status: 200,
    });
  } catch (err) {
    return new Response("Failed to fetch posts ", { status: 500 });
  }
};
