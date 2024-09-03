import jwt from 'jsonwebtoken'

export const generateToken = (name , rollNumber , section, role) => {
    return jwt.sign({name , rollNumber , section, role} , process.env.JWT_SECRET , {
        expiresIn: '1d'
    });
}

export const verifyToken = (token) => {
    return jwt.verify(token , process.env.JWT_SECRET);
}