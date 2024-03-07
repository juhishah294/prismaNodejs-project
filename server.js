const express = require("express");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors"); // Add CORS middleware
const path = require("path");

const prisma = new PrismaClient();
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors()); // Enable CORS for all routes

app.use(express.static(path.join(__dirname, "public")));

// Serve the HTML file at the root path
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/users", async (req, res) => {
  const { username, email } = req.body;

  try {
    // Save user to the database
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        name: username,
      },
    });

    console.log("New user created:", newUser);

    // Respond with the newly created user
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error adding user:", error.message);

    // Respond with an error message
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET route to retrieve all users
app.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error("Error retrieving users:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
