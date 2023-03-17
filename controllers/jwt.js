import jwt from "jsonwebtoken";
import { calcFromStr } from "../commons/_Gen090.js";

/* with login response sends a cookie named 'access-token' whose payload is a jwt with a secret passphrase and an expire date. 
   so in the end both the cookie and the payload got an expire date.

   attachCookiesToResponse 
     call createJWT
     res.cookie

*/
export const createJWT = (payload) => {
  console.log("payload vale");
  console.log(payload);
  console.log(process.env.JWT_LIFETIME);
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  console.log(token);
  return token;
};

export const attachCookiesToResponse = ({ res, payload }) => {
  console.log("attacj");
  console.log({ res });
  console.log({ payload });
  const user = payload;
  const token = createJWT({ user });

  const oneDay = 1000 * 60 * 60 * 24;

  console.log("expires is ", calcFromStr(process.env.JWT_LIFETIME_DATE_OLD2));
  console.log("expires is ", Date.now());
  console.log("expires is ", new Date(Date.now()));
  console.log(
    "expires is ",
    new Date(Date.now() + calcFromStr(process.env.JWT_LIFETIME_DATE_OLD))
    //new Date(Date.now() + parseInt(process.env.JWT_LIFETIME_DATE_OLD2))
  );

  res.cookie("access-token", token, {
    httpOnly: true,
    //expires: new Date(Date.now() + oneDay),
    expires: new Date(
      Date.now() + calcFromStr(process.env.JWT_LIFETIME_DATE_OLD)
      //Date.now() + parseInt(process.env.JWT_LIFETIME_DATE_OLD2)
    ),
    //maxAge: parseInt(process.env.JWT_LIFETIME),
    secure: process.env.NODE_ENV === "production",
    //signed: true,
  });
  return res;
};

export const isTokenValid = (token) => {
  console.log("isTokenValid");
  console.log(token);

  const ret = jwt.verify(token, process.env.JWT_SECRET);
  console.log("jwt.verify ret vale ", ret);
  return ret;
};
