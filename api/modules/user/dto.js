import validation from "../../lib/zod.js";

const SchemaCreateUser = validation.object({
    name:validation.string().trim(),
    paternal_surname:validation.string().trim(),
    maternal_surname:validation.string().trim(),
    nickname:validation.string().min(5).max(10).trim(),
    email:validation.string(),
    password:validation.string().min(7).trim(),
}).strict();

export default {
    SchemaCreateUser,
}