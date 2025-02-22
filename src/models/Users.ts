import db from "../../db";

export const createUser = async (
  username: string,
  password: string,
  role = "User"
) => {
  const result = await db.query(
    "INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING (username, role)",
    [username, password, role]
  );
  return result;
};
