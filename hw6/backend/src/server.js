import express from "express";
import connectDB from "./db";
import cors from "cors";
import routes from "./routes/index";

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", routes);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server is listening on port ${port}`));
