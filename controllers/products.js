import express from "express";
import { getAllProducts, getProductsBySearch } from "../models/products.js";

// This line creates a router that connects all of the end point functions
// In this file up to the rest of the node application
//
// Routers direct incoming requests to the related end points.
const productController = express.Router();

// We write the end points (actions) between these two lines
productController.get("/product_list", (request, response) => {
  // If the user has provided search terms
  if (request.query.search_term) {
    // Ask the model for products based on the search terms
    getProductsBySearch(request.query.search_term).then(([products]) => {
      // Render the product list view and send it back to the browser
      response.status(200).render("product_list.ejs", { products: products });
    });
  } else {
    // Ask for the list of products from the database (model)
    getAllProducts().then(([products]) => {
      // This code will run when the database query is finished and
      // the results are available to us

      // Render the product list view and send it back to the browser
      response.status(200).render("product_list.ejs", { products: products });
    });
  }
});

// This line makes the controller available to the server.js
export default productController;
