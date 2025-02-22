import db from "../../db";

export const createOrder = async (userId: number, totalAmount: number) => {
  const result = await db.query(
    "INSERT INTO Orders (user_id, total_amount) VALUES (?, ?) RETURNING *",
    [userId, totalAmount]
  );
  return result; // Returning the newly created order
};

export const getAllOrders = async () => {
  const result = await db.query("SELECT * FROM Orders");
  return result;
};

export const getOrdersByUser = async (userId: number) => {
  const result = await db.query("SELECT * FROM Orders WHERE user_id = ?", [
    userId,
  ]);
  return result;
};

export const deleteOrder = async (id: number) => {
  await db.query("DELETE FROM Orders WHERE id = ?", [id]);
};
