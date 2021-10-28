import bcrypt from 'bcryptjs';

export const Crypto = {
    encrypt: (value: string): string => bcrypt.hashSync(value),
    compare: (rawValue: string, hashValue: string): boolean => bcrypt.compareSync(rawValue, hashValue)
}