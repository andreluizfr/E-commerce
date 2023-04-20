import { z } from "zod";

export const ratingDTO = z.object({
  
});

export type RatingDTO = z.infer<typeof ratingDTO>;