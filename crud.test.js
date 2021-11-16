import { booksPopulate, booksConnect } from "./db.js";
import * as booksSrv from "./crud.js";

describe("given a connection with a MongoDB", () => {
  describe("when a collection is defined and populated", () => {
    // Arrange
    let mongoClient;
    let booksCollection;
    let first_Id;
    let initialCount;
    beforeEach(async () => {
      // Arrange
      const result = await booksPopulate();
      first_Id = result.insertedIds["0"];
      initialCount = result.insertedCount;
      // Act
      ({ mongoClient, booksCollection } = await booksConnect());
    });

    afterEach(() => {
      mongoClient.close();
    });

    test("should connect to the collection", async () => {
      //Assert
      expect(booksCollection).toBeTruthy();
    });

    test("should get all the items", async () => {
      // Arrange
      //Act
      const result = await booksSrv.getAllBooks();
      //Assert
      expect(result.length).toBe(initialCount);
    });

    test("should get one item by id", async () => {
      // console.log(firstId, typeof firstId);
      // console.log(firstId.toString());
      const result = await booksSrv.getBookById(first_Id.valueOf());
      expect(result).toHaveProperty("_id");
      // expect(result._id).toBe(first_Id);
      expect(result.title).toBe("Software");
    });

    test("should add a new item", async () => {
      // Arrange
      const newBook = {
        title: "Hyperion",
        year: "1989",
        txtAuthors: "Dan Simmons",
      };
      //Act
      const result = await booksSrv.insertBook(newBook);
      //Assert
      expect(result.acknowledged).toBe(true);
      expect(result).toHaveProperty("insertedId");
    });

    test("should update a item", async () => {
      // Arrange
      const newBook = {
        title: "Hyperion",
        year: "1989",
        txtAuthors: "",
      };
      //Act
      const result = await booksSrv.updateBook(first_Id.valueOf(), newBook);
      //Assert
      expect(result.acknowledged).toBe(true);
      expect(result.matchedCount).toBe(1);
      expect(result.modifiedCount).toBe(1);
    });

    test("should delete a item", async () => {
      // Arrange
      //Act
      const result = await booksSrv.deleteBook(first_Id.valueOf());
      //Assert
      expect(result.acknowledged).toBe(true);
      expect(result.deletedCount).toBe(1);
    });
  });
});
