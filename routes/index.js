//exports.others = require("./routes/others.js");

import { default as user_route } from "./user.js";

import { default as auth_route } from "./auth.js";

import { getFromGitHub } from "./tests.js";

export { user_route, auth_route, getFromGitHub } 