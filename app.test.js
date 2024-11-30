const request = require("supertest");
const app = require("./app");
const items = require("./fakeDb");

beforeEach(() => {
  items.length = 0; // Clear the items array before each test
  items.push({ name: "popsicle", price: 1.45 });
});

describe("GET /items", () => {
  test("Get all items", async () => {
    const res = await request(app).get("/items");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([{ name: "popsicle", price: 1.45 }]);
  });
});

describe("POST /items", () => {
  test("Add a new item", async () => {
    const res = await request(app)
      .post("/items")
      .send({ name: "cheerios", price: 3.4 });
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({ added: { name: "cheerios", price: 3.4 } });
  });

  test("Respond with error if name or price is missing", async () => {
    const res = await request(app).post("/items").send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toEqual("Name and price are required.");
  });
});

describe("GET /items/:name", () => {
  test("Get a single item", async () => {
    const res = await request(app).get("/items/popsicle");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ name: "popsicle", price: 1.45 });
  });

  test("Respond with error if item not found", async () => {
    const res = await request(app).get("/items/nonexistent");
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toEqual("Item not found.");
  });
});

describe("PATCH /items/:name", () => {
  test("Update an item", async () => {
    const res = await request(app)
      .patch("/items/popsicle")
      .send({ name: "new popsicle", price: 2.45 });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      updated: { name: "new popsicle", price: 2.45 },
    });
  });

  test("Respond with error if item not found", async () => {
    const res = await request(app)
      .patch("/items/nonexistent")
      .send({ name: "new item" });
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toEqual("Item not found.");
  });
});

describe("DELETE /items/:name", () => {
  test("Delete an item", async () => {
    const res = await request(app).delete("/items/popsicle");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: "Deleted" });
  });

  test("Respond with error if item not found", async () => {
    const res = await request(app).delete("/items/nonexistent");
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toEqual("Item not found.");
  });
});
