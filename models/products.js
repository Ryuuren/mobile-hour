import { db_conn } from "../database.js";

// Create
export function createProduct(
  product_name,
  product_model,
  product_manufacturer,
  product_price,
  product_stock
) {
  return db_conn.query(
    `
        INSERT INTO products
        (product_name, product_model, product_manufacturer, product_price, product_stock)
        VALUES (?, ?, ?, ?, ?)
    `,
    [product_name, product_model, product_manufacturer, product_price, product_stock]
  );
}

// Read
export function getAllProducts() {
  return db_conn.query(`SELECT * FROM products`);
}

export function getProductById(product_id) {
  return db_conn.query(`SELECT * FROM products WHERE product_id = ?`, [product_id]);
}

export function getProductByName(product_name) {
  return db_conn.query(`SELECT * FROM products WHERE product_name = ?`, [product_name]);
}

export function getProductsBySearch(search_term) {
  return db_conn.query(
    "SELECT * FROM products WHERE product_name LIKE ? OR product_manufacturer LIKE ?",
    [`%${search_term}%`, `%${search_term}%`]
  );
}

// Update
export function updateProductById(
  product_id,
  product_name,
  product_model,
  product_manufacturer,
  product_price,
  product_stock
) {
  return db_conn.query(
    `
        UPDATE products
        SET product_name = ?, product_model = ?, product_manufacturer = ?, product_price = ?, product_stock = ?
        WHERE product_id = ?
        `,
    [product_name, product_model, product_manufacturer, product_price, product_stock, product_id]
  );
}

// Delete
export function deleteProductById(product_id) {
  return db_conn.query(`DELETE FROM products WHERE product_id = ?`, [product_id]);
}
