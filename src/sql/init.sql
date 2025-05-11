-- ===============================
-- Users
-- ===============================
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===============================
-- Products
-- ===============================
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price NUMERIC(10,2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===============================
-- Orders
-- ===============================
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id),
    status TEXT DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===============================
-- Order Items (Products in an order)
-- ===============================
CREATE TABLE IF NOT EXISTS order_items (
  id SERIAL PRIMARY KEY,
  order_id INT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id INT NOT NULL REFERENCES products(id),
  quantity INT NOT NULL,
  price NUMERIC(10,2) NOT NULL
);

-- ===============================
-- Purchases (When a user buys a product directly)
-- ===============================
CREATE TABLE IF NOT EXISTS purchases (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  product_id INT REFERENCES products(id),
  quantity INT NOT NULL,
  total_amount NUMERIC(10,2) NOT NULL,
  purchased_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===============================
-- Billing (For each order)
-- ===============================
CREATE TABLE IF NOT EXISTS billings (
  id SERIAL PRIMARY KEY,
  order_id INT REFERENCES orders(id),
  amount NUMERIC(10,2) NOT NULL,
  billing_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  payment_status TEXT DEFAULT 'UNPAID'
);

-- ===============================
-- Function: Get low-stock products
-- ===============================
CREATE OR REPLACE FUNCTION get_low_stock_products(limit_count INT)
RETURNS TABLE(id INT, name TEXT, stock INT) AS $$
BEGIN
  RETURN QUERY
  SELECT id, name, stock FROM products WHERE stock < 10 LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;

-- ===============================
-- Function: Create Order
-- ===============================
CREATE OR REPLACE FUNCTION create_order(p_user_id INT, p_product_id INT, p_quantity INT)
RETURNS VOID AS $$
DECLARE
  product_price NUMERIC(10,2);
  order_id INT;
BEGIN
  -- Get product price
  SELECT price INTO product_price FROM products WHERE id = p_product_id;

  -- Create order
  INSERT INTO orders(user_id) VALUES(p_user_id) RETURNING id INTO order_id;

  -- Add item to order_items
  INSERT INTO order_items(order_id, product_id, quantity, price)
  VALUES(order_id, p_product_id, p_quantity, product_price);

  -- Create billing record
  INSERT INTO billings(order_id, amount) VALUES(order_id, p_quantity * product_price);

  -- Reduce stock
  UPDATE products SET stock = stock - p_quantity WHERE id = p_product_id;
END;
$$ LANGUAGE plpgsql;
