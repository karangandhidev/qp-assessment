import db from "../../db";

export const createOrderItem = async (
  orderId: number,
  groceryItemId: number,
  quantity: number,
  itemPrice: number
) => {
  const [result] = await db.query(
    "INSERT INTO OrderItems (order_id, grocery_item_id, quantity, item_price) VALUES (?, ?, ?, ?)",
    [orderId, groceryItemId, quantity, itemPrice]
  );
  return result;
};

export const getOrderItemsByOrder = async (orderId: number) => {
  const [result] = await db.query(
    "SELECT * FROM OrderItems WHERE order_id = ?",
    [orderId]
  );
  return result;
};

export const deleteOrderItem = async (id: number) => {
  await db.query("DELETE FROM OrderItems WHERE id = ?", [id]);
};
