import dotenv from "dotenv-defaults";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import User from "./models/user";
const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => console.log("mongo db connection created"));

app.get("/", (req, res) => {
  res.send("Received a GET HTTP method");
});

app.post("/", (req, res) => {
  res.send("Received a POST HTTP method");
  console.log(req.body.text);
});

app.put("/", (req, res) => {
  res.send("Received a PUT HTTP method");
});

app.delete("/", (req, res) => {
  res.send("Received a DELETE HTTP method");
});

app.post("/users", (req, res) => {
  res.send("POST HTTP method on users resource");
});

app.put("/users/:userId", (req, res) => {
  res.send(`PUT HTTP method on users/${req.params.userId} resource`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});

const saveUser = async (id, name) => {
  const existing = await User.findOne({ name });

  if (existing) throw new Error(`data ${name} exists!`);
  try {
    const newUser = new User({ id, name });
    console.log("Created user", newUser);
    return newUser.save();
  } catch (err) {
    throw new Error(`User creation error: ` + err);
  }
};

const deleteDB = async () => {
  try {
    await User.deleteMany();
    console.log("Database deleted");
  } catch (err) {
    throw new Error("Database deletion failed");
  }
};

const db = mongoose.connection;
db.on("error", (err) => console.log(err));
db.once("open", async () => {
  await deleteDB();
  await saveUser(87, "Nicolas");
  await saveUser(66, "Ric");
});
