import { z } from 'zod';

export const collectionDTO = z.object({
    collectionId: z.string()
        .optional(),
    title: z.string({required_error: "Título da coleção não informada."}),
    description: z.string(),
    products: z.array(z.object({})),
    created_at: z.date()
        .optional(),
});

export type CollectionDTO = z.infer<typeof collectionDTO>;