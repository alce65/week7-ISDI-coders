import * as dotenv from "dotenv";
dotenv.config();
import { mongoConnect } from "./db.js";
describe("given a connection with MongoDB", () => {
  const initialDBName = process.env.DBNAME;
  test("then should exist", async () => {
    const { mongoClient, db } = await mongoConnect();
    expect(mongoClient).toBeTruthy();
    expect(db).toBeTruthy();
    expect(db.databaseName).toBe(initialDBName);
    mongoClient.close();
  });
});
