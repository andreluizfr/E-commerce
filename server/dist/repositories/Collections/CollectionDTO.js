"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectionDTO = void 0;
const zod_1 = require("zod");
exports.collectionDTO = zod_1.z.object({
    id: zod_1.z.string()
        .optional(),
    title: zod_1.z.string({ required_error: "Título da coleção não informada." }),
    description: zod_1.z.string(),
    products: zod_1.z.array(zod_1.z.object({})),
    created_at: zod_1.z.date()
        .optional(),
});
