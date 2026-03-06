
import express, { type Request, type Response } from 'express';
import { RoutesConnector } from "./RouteConnector.ts"; 
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(RoutesConnector);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
