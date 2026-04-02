
import express, { type Request, type Response } from 'express';
import { RoutesConnector } from "./RouteConnector"; 
import cors from "cors";
import path from "path";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(RoutesConnector);

app.use(express.static(path.join(__dirname, "../src/public/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../src/public/dist/index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
