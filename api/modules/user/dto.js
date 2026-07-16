import validation from "../../lib/zod.js";

const SchemaCreateUser = validation.object({
    name:validation.string().min(2).trim(),
    paternal_surname:validation.string().min(2).trim(),
    maternal_surname:validation.string().min(2).trim(),
    nickname:validation.string().min(5).max(10).trim(),
    email:validation.string().trim(),
    password:validation.string().min(7).trim(),
}).strict();

const SchemaUpdateUser = validation.object({
    name:validation.string().trim().min(2).optional(),
    paternal_surname:validation.string().trim().min(2).optional(),
    maternal_surname:validation.string().trim().min(2).optional(),
    email:validation.string().trim().optional(),
    nickname:validation.string().min(5).max(10).trim(),
}).strict()

const SchemaStatusUser = validation.object({
    nickname: validation.string().min(5).max(10).trim(),
    active:validation.boolean()
}).strict();

export default {
    SchemaCreateUser,
    SchemaUpdateUser,
    SchemaStatusUser,
}