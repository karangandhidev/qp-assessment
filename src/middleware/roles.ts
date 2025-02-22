export const roles = ["user", "admin"];

export const rights = new Map();

rights.set(roles[0], ["get", "order"]);
rights.set(roles[1], ["create", "delete", "update", "get"]);
