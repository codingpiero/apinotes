import validation from "../../lib/zod.js";

const schemaCreateNote = validation.object({
    title:validation.string().min(5).max(50),
    description:validation.string().max(200),
    date_start: validation.string().regex(/^\d{4}-\d{2}-\d{2}$/)
}).strict();

const schemaCodigoNote = validation.number();


const schemaUpdateNote = validation.object({
    title:validation.string().min(5).max(50),
    description:validation.string().max(200),
    date_start: validation.string().regex(/^\d{4}-\d{2}-\d{2}$/)
}).strict();

export default {
    schemaCreateNote,
    schemaCodigoNote,
    schemaUpdateNote,
}