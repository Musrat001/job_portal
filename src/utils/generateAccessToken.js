import jwt from "jsonwebtoken";

const generateAccessToken = async (userId) => {
    return jwt.sign(
        {
            _id: userId

        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: 300
        }
    );
    

    
}

export {
    generateAccessToken
}