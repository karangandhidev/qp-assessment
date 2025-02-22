import db from "../../db";

export const createOrder = async (userId: number, totalAmount: number) => {
  const result: any = await db.query(
    "INSERT INTO orders (user_id, total_amount) VALUES (?, ?)",
    [userId, totalAmount]
  );
  return result; // Returning the newly created order
};

export const getAllOrders = async () => {
  const [result] = await db.query(
    `SELECT 
      O.id AS order_id,
      O.user_id,
      O.total_amount,
      O.created_at AS order_created_at,
      JSON_ARRAYAGG(
          JSON_OBJECT(
              'order_item_id', Oi.id,
              'quantity', Oi.quantity,
              'item_price', Oi.item_price,
              'grocery_item_id', Gr.id,
              'grocery_item_name', Gr.name,
              'description', Gr.description,
              'grocery_item_price', Gr.price
          )
      ) AS order_items
  FROM Orders AS O
  JOIN OrderItems AS Oi ON O.id = Oi.order_id
  JOIN GroceryItems AS Gr ON Oi.grocery_item_id = Gr.id
  GROUP BY O.id`
  );
  return result;
};

export const getOrdersByUser = async (userId: number) => {
  const [result] = await db.query(
    `SELECT 
      O.id AS order_id,
      O.user_id,
      O.total_amount,
      O.created_at AS order_created_at,
      JSON_ARRAYAGG(
          JSON_OBJECT(
              'order_item_id', Oi.id,
              'quantity', Oi.quantity,
              'item_price', Oi.item_price,
              'grocery_item_id', Gr.id,
              'grocery_item_name', Gr.name,
              'description', Gr.description,
              'grocery_item_price', Gr.price
          )
      ) AS order_items
  FROM Orders AS O
  JOIN OrderItems AS Oi ON O.id = Oi.order_id
  JOIN GroceryItems AS Gr ON Oi.grocery_item_id = Gr.id
  WHERE O.user_id = ?
  GROUP BY O.id`,
    [userId]
  );
  return result;
};

export const deleteOrder = async (id: number) => {
  await db.query("DELETE FROM Orders WHERE id = ?", [id]);
};
