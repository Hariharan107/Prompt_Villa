import Prompt from "@models/prompt";
import { connectToDb } from "@utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDb();
    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) return new Response("Prompt not found", { status: 404 });
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify(err) || "Failed to fetch the posts", {
      status: 500,
    });
  }
};
export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();
  try {
    await connectToDb();
    const existingPrompts = await Prompt.findByIdAndUpdate(params.id, {
      prompt,
      tag,
    });
    if (!existingPrompts)
      return new Response("Prompt not found", { status: 404 });
    return new Response(JSON.stringify(existingPrompts), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify(err) || "Failed to update the prompt", {
      status: 500,
    });
  }
};
export const DELETE = async (request, { params }) => {
  try {
    await connectToDb();
    const existingPrompts = await Prompt.findByIdAndDelete(params.id);
    if (!existingPrompts)
      return new Response("Prompt not found", { status: 404 });
    return new Response(JSON.stringify(existingPrompts), { status: 204 });
  } catch (err) {
    return new Response(JSON.stringify(err) || "Failed to delete the prompt", {
      status: 500,
    });
  }
};
