# qp-assessment
How to run:
1. npm install
2. Start sql
3. Adjust .env file (Database configuration)
4. npm run setup-db
5. npm run serve
6. Use tools like Postman or something since this is only API as of now.

How to use:
1. Create users/admin
2. Use the login API to fetch JWT token
3. Add JWT token as Bearer token for authentication
4. Add items to inventory (GroceryItems)
5. View items available in inventory
6. Create/delete orders
7. Update inventory if needed

Note: 
1. Normal users can create orders only for themselves. Admins can create orders for anyone.
2. Normal users can delete orders only for themselves. Admins can delete all orders.
3. Normal users can view only their own orders. Admins can view all orders.
4. Only admins can make changes to the inventory.
5. When orders are placed, inventory levels are managed automatically.
6. OrderItems table will be populated automatically while creating orders.
