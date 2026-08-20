import jwt from "jsonwebtoken";

const generateAccessToken = async (userId) => {
    const genetedToken = jwt.sign(
        {
            _id: userId

        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: 300
        }
    );
    console.log(genetedToken);

    return genetedToken
}

export {
    generateAccessToken
}