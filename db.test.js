import * as dotenv from "dotenv";
dotenv.config();
import { mongoConnect, booksPopulate, booksConnect } from "./db.js";

describe("given a connection with MongoDB", () => {
  const initialDBName = process.env.DBNAME;
  test("then should exist our DB", async () => {
    const { mongoClient, dbCoders } = await mongoConnect();
    expect(mongoClient).toBeTruthy();
    expect(dbCoders).toBeTruthy();
    expect(dbCoders.databaseName).toBe(initialDBName);
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
      // console.log(result);
      //Assert
      expect(result).toBeTruthy();
      expect(result.acknowledged).toBe(true);
      expect(result.insertedCount).toBe(9);
    });

    test("then it should be accessed ", async () => {
      // Arrange
      //Act
      const { mongoClient, booksCollection } = await booksConnect();
      // console.log(booksCollection);
      //Assert
      expect(booksCollection).toBeTruthy();
      expect(booksCollection.collectionName).toBe(process.env.BOOKS_COLLECTION);
      mongoClient.close();
    });
  });
});
