import express from "express";
const router = express.Router();

export const getFromGitHub = (userName, url) => {
  //console.log(arguments[1]);
  //console.log(userName, url);
  console.log(`${url}/${userName}/repos`);

  /*
  fetch(`${url}/${userName}/repos`)
    .then((reposResponse) => {
      return reposResponse.json();
    })
    .then((userRepos) => {
      console.log(userRepos);
    })
    .catch((err) => {
      console.log(err);
    });
    */
  return "";
};

router.get("/getfromgithub", (req, res, next) => {
  const resp = getFromGitHub("patarkf", "https://api.github.com/users");

  console.log(resp);
  //next()
  //res.("ciao");
});
