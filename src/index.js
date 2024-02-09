import express from "express";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

let mockData = [
  { id: 1, name: "test1" },
  { id: 2, name: "test2" },
  { id: 3, name: "test3" },
];

app.get("/api/users", (req, res) => {
  return res.status(200).send(mockData);
});

app.get("/api/users/:id", (req, res) => {
  return res.status(200).send({ id: 1, name: "test1" });
});

app.post("/api/users", (req, res) => {
  const { body } = req;
  if (!body.name) {
    return res.status(400).send({ message: "name is required" });
  }
  let newUser = { id: mockData.length + 1, name: body.name };
  mockData.push(newUser);
  return res.status(201).send(newUser);
});

app.put("/api/users/:id", (req, res) => {
  const { body, params } = req;
  if (!params.id) {
    return res.status(400).send({ message: "id is required!" });
  }
  if (!body.name) {
    return res.status(400).send({ message: "name is required" });
  }
  let userIndex = mockData.findIndex((item) => item.id === Number(params.id));
  if (userIndex===-1) {
    return res.status(404).send({ message: "user not found!" });
  }
  mockData[userIndex].name = body.name;
  return res.status(201).send(mockData[userIndex]);
});

app.delete("/api/users/:id", (req, res) => {
  const { params } = req;
  if (!params.id) {
    return res.status(400).send({ message: "id is required!" });
  }
  let userIndex = mockData.findIndex((item) => item.id === Number(params.id));
  if (userIndex===-1) {
    return res.status(404).send({ message: "user not found!" });
  }
  mockData = mockData.filter((item) => item.id !== Number(params.id));
  return res.status(201).send(null);
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
