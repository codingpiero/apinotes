import bcrypt from "bcrypt";

const generatedEncryption = async (password) => {
    return await bcrypt.hash(password,7);
}

export default {
    generatedEncryption,
}