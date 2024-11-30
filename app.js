const express = require("express");
const app = express();
const itemsRoutes = require("./routes/items");

app.use(express.json());

app.use("/items", itemsRoutes);

app.use((req, res, next) => {
  return res.status(404).json({ error: "Not Found" });
});

module.exports = app;
