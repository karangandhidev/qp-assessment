import db from "../../db";
import bcrypt from "bcrypt";
import ApiError from "../utils/ApiError";
import { StatusCodes } from "http-status-codes";
export const createUser = async (
  username: string,
  password: string,
  role = "User"
) => {
  const salt = bcrypt.genSaltSync(12);
  password = bcrypt.hashSync(password, salt);
  const [result]: any = await db.query(
    "INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
    [username, password, role]
  );

  const insertedId = result.insertId;
  const [user] = await db.query(
    `Select username, role from ${process.env.db_name}.users where id = ${insertedId}`
  );

  return user;
};

export const deleteUserById = async (id: number) => {
  const [result]: any = await db.query("DELETE FROM users WHERE id = ?", [id]);

  if (result.affectedRows === 0) {
    throw new Error("User not found or already deleted");
  }

  return { message: "User deleted successfully" };
};

export const login = async (username: string, password: string) => {
  const [user]: any = await db.query(
    `select * from users where username='${username}'`
  );
  if (user.length == 0) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid Username or Password");
  }

  if (!bcrypt.compareSync(password, user[0].password)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid Username or Password");
  }
  return user[0];
};
