import Prompt from "@models/prompt";
import { connectToDb } from "@utils/database";

export const GET = async (request) => {
  try {
    await connectToDb();
    const prompts = await Prompt.find({}).populate("creator");
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify(err) || "Failed to fetch the posts", {
      status: 500,
    });
  }
};
