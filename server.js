import express, { request, response } from "express";

// creates an express app and defines a port
const app = express();
const port = 8080;

// Enables the ejs view engine
app.set("view engine", "ejs"); 

// Links the controller files
import productController from "./controllers/products.js";
app.use(productController);

// Redirects requests to root to the user list page TEST 

// TODO CHANGE TO HOMEPAGE //
app.get("/", (request, response) => {
  response.status(301).redirect("/user_list");
});

// serves static resources
app.use(express.static("static"));

// this is a test endpoint
app.get("/hello", (request, response) => {
  response.json("Hello World!");
});

// test endpoint calculator
app.get("/add", (request, response) => {
  let numberA = Number.parseInt(request.query.a);
  let numberB = Number.parseInt(request.query.b);
  let mySum = numberA + numberB;
  response.json(mySum);

  // Shorthand version of above code

  // Number.parseInt(request.query.a) + Number.parseInt(request.query.b);
});

// This is a test endpoint to show an array of users
import { getAllUsers } from "./models/users.js";
app.get("/user_list", (request, response) => {
    getAllUsers().then(([results]) => {
      response.json(results);
    });
});

// a list of phones to test with 
// and controllers

const test_products = [
  {
    product_id: 1,
    product_name: "Galaxy",
    product_model: "10",
    product_price: "$800",
  },
  {
    product_id: 2,
    product_name: "iPhone",
    product_model: "14",
    product_price: "$1800",
  }
];

// This is another test endpoint for the product list
app.get("/test_product_list", (request, response) => {
  response.status(200).render("product_list.ejs", { products: test_products });
});

// This is another test endpoint for the product checkout
app.get("/test_product_checkout", (request, response) => {
  response.status(200).render("product_checkout.ejs", { product: test_products[1] });
});

// starts the backend express server
app.listen(port, () => {
  console.log("Express server started on http://localhost:" + port);
});
