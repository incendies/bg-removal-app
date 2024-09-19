'use server'

import * as fal from "@fal-ai/serverless-client";

console.log("FAL_KEY:", process.env.FAL_KEY ? "Set" : "Not set");

fal.config({
  credentials: process.env.FAL_KEY,
});

export async function removeBg(imageUrl: string) {
  try {
    console.log("Attempting to remove background...");
    const result = await fal.subscribe("fal-ai/birefnet", {
      input: {
        image_url: imageUrl,
        model: "General Use (Light)",
        operating_resolution: "1024x1024",
        output_format: "png"
      },
    }) as { image: { url: string } };

    console.log("Background removal successful");
    return result.image.url;
  } catch (error) {
    console.error('Background removal failed:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    throw new Error('Failed to remove background. Please check your API key and permissions.');
  }
}
