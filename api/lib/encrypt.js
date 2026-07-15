import bcrypt from "bcrypt";

const generatedEncryption = async (password) => {
    return await bcrypt.hash(password,7);
}
const comparedEncryption = async (password,encryptPassword) => {
    return await bcrypt.compare(password,encryptPassword);
}

export default {
    generatedEncryption,
    comparedEncryption,
}