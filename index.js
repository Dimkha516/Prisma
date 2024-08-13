const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

// ROUTE POUR CRÉER UN NOUVEL UTILISATEUR:
app.post("/users", async (req, res) => {
  const { name, email } = req.body;

  try {
    const newUser = await prisma.user.create({
      data: { name, email },
    });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});

// ROUTE POUR RÉCUPÉRER TOUS LES UTILISATEURS:
app.get("/users", async (req, res) => {
  try{
    const users = await prisma.user.findMany();
    res.json(users)
  }
  catch(err) {
    res.status(400).json({err: err.message})
  }
})

app.listen(3000, () => {
  console.log("Server running on port: 3000");
  
})


