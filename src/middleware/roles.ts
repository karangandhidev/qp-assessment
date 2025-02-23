export const roles = ["user", "admin"];

export const rights = new Map();

rights.set(roles[0], ["userget", "usercreate", "userdelete"]);
rights.set(roles[1], [
  "admincreate",
  "admindelete",
  "adminupdate",
  "adminget",
  "userdelete",
  "usercreate",
  "userget",
]);
