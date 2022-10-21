
import jwt from 'jsonwebtoken';

export const createJWT = (payload) => {
    console.log("payload vale")
    console.log(process.env.JWT_LIFETIME)
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME,
    });
    console.log(token)
    return token;
};

export const isTokenValid = (token) => {
    console.log("token tavolta vale")
    console.log(token)

    return jwt.verify(token, process.env.JWT_SECRET)
};

export const attachCookiesToResponse = ({ res, user }) => {
    console.log("attacj")
    console.log(user)
    const token = createJWT({ user });

    const oneDay = 1000 * 60 * 60 * 24;

    res.cookie('access-token', token, {
        httpOnly: true,
        //expires: new Date(Date.now() + oneDay),
        expires: new Date(Date.now() + parseInt(process.env.JWT_LIFETIME_DATE_OLD)),
        //maxAge: parseInt(process.env.JWT_LIFETIME),
        secure: process.env.NODE_ENV === 'production',
        //signed: true,
    });
};

