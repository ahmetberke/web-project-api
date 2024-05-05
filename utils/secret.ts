import bcrypt from "bcrypt";

const saltRounds = 10;

export const hashPassword = async (password: string): Promise<string> => {
    const crypted = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, crypted);
}

export const validatePassword = async (password : string, hash: string): Promise<boolean> => {
    return bcrypt.compare(password, hash);
}