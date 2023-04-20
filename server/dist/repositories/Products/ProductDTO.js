"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productDTO = void 0;
const zod_1 = require("zod");
exports.productDTO = zod_1.z.object({
    id: zod_1.z.string()
        .optional(),
    title: zod_1.z.string({ required_error: "Título do produto não informado." }),
    description: zod_1.z.string(),
    midias: zod_1.z.array(zod_1.z.object({
        attributeValue: zod_1.z.string().optional(),
        type: zod_1.z.string().optional(),
        url: zod_1.z.string().optional()
    })),
    price: zod_1.z.number()
        .nullable(),
    comparisonPrice: zod_1.z.number()
        .nullable(),
    costPerProduct: zod_1.z.number()
        .nullable(),
    category: zod_1.z.union([
        zod_1.z.literal("Roupas masculinas"),
        zod_1.z.literal("Roupas femininas"),
        zod_1.z.literal("Telefonia"),
        zod_1.z.literal("Computadores"),
        zod_1.z.literal("Eletrônicos"),
        zod_1.z.literal("Utensílios para casa"),
        zod_1.z.literal("Casa e decoração"),
        zod_1.z.literal("Bolsas e calçados"),
        zod_1.z.literal("Jóias e relógios"),
        zod_1.z.literal("Saúde e beleza"),
        zod_1.z.literal("Pets"),
        zod_1.z.literal("Brinquedos e hobbies"),
        zod_1.z.literal("infantil"),
        zod_1.z.literal("Esportes"),
        zod_1.z.literal("Ferramentas e construção")
    ], { invalid_type_error: "A categoria recebida não é um categoria válida." }),
    subcategory: zod_1.z.string(),
    providerURL: zod_1.z.string(),
    attributes: zod_1.z.array(zod_1.z.object({
        name: zod_1.z.string({ required_error: "Nome do atributo precisa ser informado." }).optional(),
        values: zod_1.z.array(zod_1.z.string({ required_error: "Lista com valores do atributo precisam ser informados." })
            .min(1, { message: "A lista dos valores não pode ser vazia." }))
    }).optional()),
    hasAttributes: zod_1.z.boolean(),
    productStatus: zod_1.z.union([
        zod_1.z.literal("rascunho"),
        zod_1.z.literal("ativo"),
        zod_1.z.literal("desativado")
    ], { invalid_type_error: "O status recebido não é um status válido." }),
    tags: zod_1.z.array(zod_1.z.string()),
    ratings: zod_1.z.array(zod_1.z.string())
        .optional(),
    sales: zod_1.z.number()
        .optional(),
    created_at: zod_1.z.date()
        .optional(),
});
