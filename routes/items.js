const express = require("express");
const router = new express.Router();
const items = require("../fakeDb");

router.get("/", (req, res) => {
  return res.json(items);
});

router.post("/", (req, res) => {
  const { name, price } = req.body;
  if (!name || !price) {
    return res.status(400).json({ error: "Name and price are required." });
  }
  const newItem = { name, price };
  items.push(newItem);
  return res.status(201).json({ added: newItem });
});

/** GET /items/:name: get a single item by name */
router.get("/:name", (req, res) => {
  const foundItem = items.find(item => item.name === req.params.name);
  if (!foundItem) {
    return res.status(404).json({ error: "Item not found." });
  }
  return res.json(foundItem);
});

router.patch("/:name", (req, res) => {
  const foundItem = items.find(item => item.name === req.params.name);
  if (!foundItem) {
    return res.status(404).json({ error: "Item not found." });
  }
  const { name, price } = req.body;
  if (name) foundItem.name = name;
  if (price) foundItem.price = price;
  return res.json({ updated: foundItem });
});

router.delete("/:name", (req, res) => {
  const itemIndex = items.findIndex(item => item.name === req.params.name);
  if (itemIndex === -1) {
    return res.status(404).json({ error: "Item not found." });
  }
  items.splice(itemIndex, 1);
  return res.json({ message: "Deleted" });
});

module.exports = router;
