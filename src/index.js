import express from "express";

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/api/users", (req, res) => {
  res.send([
    { id: 1, name: "test1" },
    { id: 2, name: "test2" },
  ]);
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
