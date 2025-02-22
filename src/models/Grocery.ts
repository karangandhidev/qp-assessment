import db from "../../db";

export const createGrocery = async (
  name: string,
  description: string | null,
  price: number,
  inventory: number
) => {
  const [result] = await db.query(
    "INSERT INTO GroceryItems (name, description, price, inventory) VALUES (?, ?, ?, ?)",
    [name, description, price, inventory]
  );
  return result; // Returning the newly created grocery item
};

export const getAllGroceries = async () => {
  const [result] = await db.query("SELECT * FROM GroceryItems");
  return result;
};

export const getGroceriesById = async (id: number) => {
  const [result]: any = await db.query(
    "SELECT * FROM GroceryItems where id = ?",
    [id]
  );
  return result;
};

export const updateGrocery = async (
  id: number,
  data: {
    name?: string;
    description?: string;
    price?: number;
    inventory?: number;
  }
) => {
  const { name, description, price, inventory } = data;
  const [result] = await db.query(
    `UPDATE GroceryItems 
     SET name = COALESCE(?, name), 
         description = COALESCE(?, description), 
         price = COALESCE(?, price), 
         inventory = COALESCE(?, inventory),
         updated_at = CURRENT_TIMESTAMP
     WHERE id = ? RETURNING *`,
    [name, description, price, inventory, id]
  );
  return result; // Returning the updated grocery item
};

export const deleteGrocery = async (id: number) => {
  await db.query("DELETE FROM GroceryItems WHERE id = ?", [id]);
};
