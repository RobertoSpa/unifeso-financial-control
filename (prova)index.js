const express = require("express");
const mongoose = require("mongoose");
const { User } = require("./models");

mongoose.connect(
  "mongodb+srv://unifeso:unifeso-password@unifeso.kwuxv.gcp.mongodb.net/unifeso-financial-control?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error: "));
db.once("open", function () {
  console.log("MongoDB Connected.");
});

const dictionary = {};

const app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// CREATE
app.post("/", async (request, response) => {
  const jsonContent = request.body;
  // User -> objeto responsável por acessar o banco de dados.
  const user = await User.create(jsonContent);
  response.status(201).send(user);
});

// READ
app.get("/:id", async (request, response) => {
  
  const obj = await User.findById(request.params.id);
  if (!obj) {
    return response.status(404).send({
      message: "Usuario nao encntrado"
    });
  }
  
  response.status(200).send(obj);
});

// UPDATE
app.put("/:id", async (request, response) => {
  
  const id = request.params.id;
  const body = request.body;
  try {
    const result = await User.findByIdAndUpdate(id, { 
      username, password
    });

    response.status(200).json({ 
      username, password
    });
    
  } catch {
    response.status(401).json({'ID de usuario incorreto'});
  }
});

// DELETE
app.delete("/:id", (request, response) => {
  
  User.findByIdAndDelete(request.params.id, (err, user) => {
    if (err) {
      return response.status(404).send({
        message: "Usuário não encontrado"
      })
    } else {
      return response.status(201).send({
        message: "Usuario deletado"
      });
    }
  });
});

const port = 8090;
app.listen(port, () => console.log(`Rodando em localhost:${port}`));

//testeeeeeeeeeeeeeeee

