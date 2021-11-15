import * as dotenv from "dotenv";
dotenv.config();
import { mongoConnect, booksPopulate } from "./db.js";

describe("given a connection with MongoDB", () => {
  const initialDBName = process.env.DBNAME;
  test("then should exist", async () => {
    const { mongoClient, db } = await mongoConnect();
    expect(mongoClient).toBeTruthy();
    expect(db).toBeTruthy();
    expect(db.databaseName).toBe(initialDBName);
    mongoClient.close();
  });

  describe("when a collection is defined", () => {
    // Arrange
    // const projectDir = process.cwd();
    // loadEnvConfig(projectDir);
    // const collectionName = "testingBooks";

    test("then it should be created and populated", async () => {
      // Arrange
      //Act
      const result = await booksPopulate();
      console.log(result);
      //Assert
      expect(result).toBeTruthy();
      expect(result.acknowledged).toBe(true);
      expect(result.insertedCount).toBe(9);
    });
  });
});
