import { z } from 'zod';

export const productDTO = z.object({
    title: z.string({required_error: "Título do produto não informado."}),
    description: z.string()
        .optional()
        .nullable(),
    midias: z.array(z.object({
            attributeValue: z.string().nullable(),
            type: z.string(),
            url: z.string().url({ message: "url inválida" })
        }))
        .optional()
        .nullable(),
    price: z.number()
        .optional()
        .nullable(),
    comparisonPrice: z.number()
        .optional()
        .nullable(),
    costPerProduct: z.number()
        .refine(cost => cost.toFixed(2))
        .optional()
        .nullable(),
    category: z.union([
        z.literal("Roupas masculinas"),
        z.literal("Roupas femininas"),
        z.literal("Telefonia"),
        z.literal("Computadores"),
        z.literal("Eletrônicos"),
        z.literal("Utensílios para casa"),
        z.literal("Casa e decoração"),
        z.literal("Jóias e relógios"),
        z.literal("Saúde e beleza"),
        z.literal("Pets"),
        z.literal("Brinquedos e hobbies"),
        z.literal("infantil"),
        z.literal("Esportes"),
        z.literal("Ferramentas e construção")
        ], {invalid_type_error: "A categoria recebida não é um categoria válida."})
        .optional()
        .nullable(),
    subcategory: z.string() //trocar pra tipo de subcategorias depois
        .optional()
        .nullable(),
    providerURL: z.string()
        .url({ message: "url inválida" })
        .optional()
        .nullable(),
    attributes: z.array(z.object({
        name: z.string({required_error: "Nome do atributo precisa ser informado."}),
        values: z.array(z.string({required_error: "Lista com valores do atributo precisam ser informados."})
            .min(1, {message: "A lista dos valores não pode ser vazia."})
        )}))
        .optional()
        .nullable(),
    productStatus: z.union([
        z.literal("rascunho"),
        z.literal("ativo"),
        z.literal("desativo")
    ], {invalid_type_error: "O status recebido não é um status válido."}),
    ratingNumbers: z.object({
        "1": z.number(),
        "2": z.number(),
        "3": z.number(),
        "4": z.number(),
        "5": z.number()
    })
    .optional()
    .nullable(),
    tags: z.array(z.string())
        .optional()
        .nullable()
});

export type ProductDTO = z.infer<typeof productDTO>;