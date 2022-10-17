import jwt from 'jsonwebtoken';

export const createJWT = ({username}) => {

    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME,
    });
    return token;
};

export const isTokenValid = ({ token }) => jwt.verify(token, process.env.JWT_SECRET);

export const attachCookiesToResponse = ({ res, user }) => {

    const token = createJWT(user);

    const oneDay = 1000 * 60 * 60 * 24;

    res.cookie('access-token', token, {
        httpOnly: true,
        //expires: new Date(Date.now() + oneDay),
        expires: new Date(Date.now() + parseInt(process.env.JWT_LIFETIME_DATE_OLD)),
        secure: process.env.NODE_ENV === 'production',
        signed: true,
    });
};

