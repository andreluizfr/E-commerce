import { z } from 'zod';

export const productDTO = z.object({
    productId: z.number()
        .optional(),
    title: z.string({required_error: "Título do produto não informado."}),
    description: z.string(),
    midias: z.array(z.object({
            attributeValue: z.string().optional(),
            type: z.string().optional(),
            url: z.string().optional()
        })),
    price: z.number()
        .nullable(),
    comparisonPrice: z.number()
        .nullable(),
    costPerProduct: z.number()
        .nullable(),
    category: z.union([
        z.literal("Roupas masculinas"),
        z.literal("Roupas femininas"),
        z.literal("Telefonia"),
        z.literal("Computadores"),
        z.literal("Eletrônicos"),
        z.literal("Utensílios para casa"),
        z.literal("Casa e decoração"),
        z.literal("Bolsas e calçados"),
        z.literal("Jóias e relógios"),
        z.literal("Saúde e beleza"),
        z.literal("Pets"),
        z.literal("Brinquedos e hobbies"),
        z.literal("infantil"),
        z.literal("Esportes"),
        z.literal("Ferramentas e construção")
        ], {invalid_type_error: "A categoria recebida não é um categoria válida."}),
    subcategory: z.string(),
    providerURL: z.string(),
    attributes: z.array(z.object({
        name: z.string({required_error: "Nome do atributo precisa ser informado."}).optional(),
        values: z.array(z.string({required_error: "Lista com valores do atributo precisam ser informados."})
            .min(1, {message: "A lista dos valores não pode ser vazia."})
        )}).optional()),
    hasAttributes: z.boolean(),
    productStatus: z.union([
            z.literal("rascunho"),
            z.literal("ativo"),
            z.literal("desativado")
        ], {invalid_type_error: "O status recebido não é um status válido."}),
    tags: z.array(z.string()),
    ratings: z.array(z.string())
        .optional(),
    created_at: z.date()
        .optional(),
});

export type ProductDTO = z.infer<typeof productDTO>;