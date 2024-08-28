const bcrypt = require('bcrypt');
const saltRounds = parseInt(process.env.SALT_ROUNDS || '10', 10);
const myPlaintextPassword = process.env.BCRYPT_PASSWORD || 'defaultPassword';


// Hashing function
export const hashPassword = async (password: string): Promise<string> => {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (err: any) {
        throw new Error(`Error hashing password: ${err.message}`);
    }
};

// Compare function
export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
    try {
        const isMatch = await bcrypt.compare(password, hash);
        return isMatch;
    } catch (err: any) {
        throw new Error(`Error comparing password: ${err.message}`);
    }
};
