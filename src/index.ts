import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import { createServer } from "http";
import { config as configure } from "dotenv";
import config from "./config";
import sql from "mssql";

configure();

const appConfig = config();
const app = express();
const server = createServer(app);

async function main() {
  app.use(bodyParser.json());

  await sql.connect(appConfig.mssql);

  app.sql = sql;

  app.post("/attendance", async (req, res) => {
    const { userId, checkTime } = req.body;
    const actualCheckTime = checkTime ? new Date(checkTime) : new Date();
    const timestamp = new Date();
    const query = `INSERT INTO c_attend_log (USERID, CHECKTIME, timestamp) VALUES (${userId}, '${actualCheckTime.toISOString()}', '${timestamp.toISOString()}')`;

    const result = await sql.query(query);
    const { recordset } = result;

    res.status(200).json(recordset);
  });

  app.get('/attendance', async (req, res) => {
    const result = await sql.query`SELECT * FROM c_attend_log ORDER BY timestamp DESC`;
    const { recordset } = result;

    res.status(200).json(recordset);
  });

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).send({ error: err.message });
  });

  server.listen(appConfig.port, () => {
    console.log(`Server listening on port ${appConfig.port}`);
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
