import express from "express";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

let mockData = [
  { id: 1, name: "test1" },
  { id: 2, name: "test2" },
]

app.get("/api/users", (req, res) => {
  console.log(req.query);
  return res.status(200).send(mockData);
});

app.get("/api/users/:id",(req,res)=>{
  console.log(req.params);
  return res.status(200).send({id:1,name:"test1"});
})

app.post("/api/users",(req,res)=>{
  const {body} = req;
  console.log(body);
  if(!body.name){
    return res.status(400).send({message:"name is required"});
  }
  let newUser = {id: mockData.length + 1, name:body.name};
  mockData.push(newUser);
  return res.status(201).send(newUser);
})

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
