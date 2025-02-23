import mysql, { Connection } from "mysql2/promise";

const setupDatabase = async () => {
  let connection: Connection | null = null;

  try {
    connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "grocery",
      multipleStatements: true,
    });

    console.log("Connected to MySQL");

    const schemaSQL: string[] = [
      `CREATE TABLE IF NOT EXISTS Users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role ENUM('admin', 'user') NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )`,

      `CREATE TABLE IF NOT EXISTS GroceryItems (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) UNIQUE NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
        inventory INT NOT NULL CHECK (inventory >= 0),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )`,

      `CREATE TABLE IF NOT EXISTS Orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        total_amount DECIMAL(10, 2) NOT NULL CHECK (total_amount >= 0),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
      )`,

      `CREATE TABLE IF NOT EXISTS OrderItems (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT NOT NULL,
        grocery_item_id INT NOT NULL,
        quantity INT NOT NULL,
        item_price DECIMAL(10,2) NOT NULL CHECK (item_price >= 0),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (order_id) REFERENCES Orders(id) ON DELETE CASCADE,
        FOREIGN KEY (grocery_item_id) REFERENCES GroceryItems(id)
      )`,
    ];

    for (const query of schemaSQL) {
      await connection.query(query);
    }

    console.log("Database schema ensured.");
  } catch (error: any) {
    console.error(" Error setting up database:", error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
      console.log(" MySQL connection closed.");
    }
  }
};

setupDatabase();
