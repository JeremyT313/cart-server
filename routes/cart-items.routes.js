const express = require("express");
const routes = express.Router();
const pool = require("../pg-connection-pool");

function selectAllItems(req, res) {
  pool.query("select * from shoppingcart order by id").then(result => {
    res.send(result.rows);
  });
}

routes.get("/items", selectAllItems);

routes.post("/items", (req, res) => {
  pool
    .query(
      "insert into shoppingcart (product, price, quantity) values ($1::text, $2::int, $3::int)",
      [req.body.product, req.body.price, req.body.quantity]
    )
    .then(() => {
      selectAllItems(req, res);
    });
});

routes.put("/items/:id", (req, res) => {
  console.log(req.body);
  pool
    .query("update shoppingcart set quantity=$1::int where id=$2::int", [
      req.body.updatedQuantity,
      req.params.id
    ])
    .then(() => {
      selectAllItems(req, res);
    });
});

routes.delete("/items/:id", (req, res) => {
  pool
    .query("delete from shoppingcart where id=$1::int", [req.params.id])
    .then(() => {
      selectAllItems(req, res);
    });
});

module.exports = routes;
