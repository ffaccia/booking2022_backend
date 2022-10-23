import { isTokenValid } from "./jwt.js";
import { CreateError } from "./errors.js";

export const verifyToken = async (req, res, next) => {
    let token;

    // check header
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split(' ')[1];
    }
    // check cookies

    else if (req.cookies['access-token']) {
        token = req.cookies['access-token'];
    }

    if (!token) {
        //throw new CustomError.UnauthenticatedError('Authentication invalid');
        next(CreateError(403, "Authentication error. token is missing!"))

    }
    try {

        const payload = isTokenValid(token);

        // Attach the user and his permissions to the req object
        req.user = {
            id: payload.user._id, //_id.toString(),
            admin: payload.user.isadmin
        };


        next();
    } catch (error) {
        //throw new CustomError.UnauthenticatedError('Authentication invalid');
        next(CreateError(403, "Authentication invalid!"))

    }
};

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user._id == req.params.id || req.user.isadmin)
            next()
        else
            next(CreateError(403, "User is not authorized to perform this operation!"))
    })
}

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.isadmin)
            next()
        next(CreateError(403, "User is not authorized to perform this operation!"))
    })
}

export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            //throw new CustomError.UnauthorizedError('Unauthorized to access this route');
            next(CreateError(403, "Unauthorized to access this route!"))
        }
        next();
    };
};

