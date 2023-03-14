import { isTokenValid } from "./jwt.js";
import { CreateError } from "./errors.js";
import UnauthenticatedError from "./unauthenticated.js";

export const verifyToken2 = async (req, res, next, session) => {
    /* authorization may come from 
       header.authorization
       header.access-token
       cookie.access-token
    */
    let token;
  
    // check header
    const authHeader = req.headers.authorization || req.headers["access-token"];
    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
      console.log("authHeader");
    }
    // check cookies
    else if (req.cookies["access-token"]) {
      token = req.cookies["access-token"];
      console.log("cookies");
    }
    console.log("payload22222 vale");
    console.log(token);
  
    if (!token) {
      console.log("token is null");
      //throw new CustomError.UnauthenticatedError('Authentication invalid');
      return next(res.send(CreateError(403, "Authentication invalid!")));
    }
    try {
      const payload = isTokenValid(token);
      console.log("payloaddddd vale", payload);
      // Attach the user and his permissions to the req object
      req.user = {
        id: payload.user._id, //_id.toString(),
        admin: payload.user.isadmin,
      };
      console.log("payloadeeeee vale", payload);
      console.log(next);
      console.log(next());
      return true;
    } catch (error) {
      //throw new CustomError.UnauthenticatedError('Authentication invalid');
      return next(res.send(CreateError(403, "Authentication invalid!")));
    }
  };
  
export const verifyToken = async (req, res, next, session) => {
  /* authorization may come from 
     header.authorization
     header.access-token
     cookie.access-token
  */
  let token;

  // check header
  const authHeader = req.headers.authorization || req.headers["access-token"];
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    console.log("authHeader");
  }
  // check cookies
  else if (req.cookies["access-token"]) {
    token = req.cookies["access-token"];
    console.log("cookies");
  }
  console.log("payload22222 vale");
  console.log(token);

  if (!token) {
    console.log("token is null");
    //throw new CustomError.UnauthenticatedError('Authentication invalid');
    return next(res.send(CreateError(403, "Authentication invalid!")));
  }
  try {
    const payload = isTokenValid(token);
    console.log("payloaddddd vale", payload);
    // Attach the user and his permissions to the req object
    req.user = {
      id: payload.user._id, //_id.toString(),
      admin: payload.user.isadmin,
    };
    return true;
  } catch (error) {
    //throw new CustomError.UnauthenticatedError('Authentication invalid');
    return next(res.send(CreateError(403, "Authentication invalid!")));
  }
};

export const verifyUser = (req, res, next) => {
  if (!verifyToken(req, res, next))
    return next(res.send(CreateError(403, "Authentication invalid!")));

  console.log("111111");
  console.log(req.user);
  console.log(req.user.admin);
  console.log(req.params.id);
  console.log("222222");

  if (req.user.id != req.params.id && !req.user.admin) {
    console.log("nonsonougual99i");
    //throw new UnauthenticatedError('No token provided')

    return next(
      res.send(
        CreateError(403, "User is not authorized to perform this operation!")
      )
    );
  }
  //next()
};

export const verifyAdmin = (req, res, next, session) => {
  verifyToken(req, res, next);

  console.log("111111");
  console.log(req.user.id);
  console.log(req.params.id);
  console.log("222222");

  if (req.user.isadmin) next();
  else {
    console.log("nonsonouguali");
    next(
      res.send(
        CreateError(403, "User is not authorized to perform this operation!")
      )
    );
  }
};

export const verifyUserAndAdmin = (req, res, next) => {
  verifyUser(req, res, next, () => {
    next();
  });
  verifyAdmin(req, res, next, () => {
    next();
  });
};

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      //throw new CustomError.UnauthorizedError('Unauthorized to access this route');
      next(CreateError(403, "Unauthorized to access this route!"));
    }
    next();
  };
};
