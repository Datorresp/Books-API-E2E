const axios = require("axios");
const { expect, assert } = require("chai");
const { StatusCodes } = require("http-status-codes");
const url = "http://localhost:4200/books";


describe("Add Books Testing API", () => {

    let numOfBooks;

    beforeEach(async () => {
    let responseGetBooks = await axios.get(url);
    numOfBooks = responseGetBooks.data.length;
    });

    describe("Adding Test", () => {

        it("Create book", async () => {

            let nBook = {
              id: "1123787f-202e-413a-8325-a9e92b3313c0",
              name: "El nombre del viento",
              author: "Patrick Rothfuss",
            };

            //Post the new Book
            const response = await axios.post(url, nBook);
            let nBook;
            nBook = response.data;
            expect(response.status).to.equal(StatusCodes.OK);


            //Verify Book Name
            expect(nBook.name).to.be.oneOf(responseGetBooks.data.map(function (book) {

                return book.name;
            }));

            //Verify Book Auth
            expect(xbook.author).to.be.oneOf(responseGetBooks.data.map(function (book) {
                return book.author;
            }));
        });

        after(async()=>{

            await axios.delete(url+"/"+nBook.id);
        })
    });

    describe("No Adding Test", () => {

        it("BUG: Create book with no title", async () => {

            let book_a = {

            id: "1123787f-202e-413a-8325-a9e92b3313c0",
            name: "",
            author: "Patrick Rothfuss",
            };

            //Post Book no Name
            const response = await axios.post(url, book_a);
            //Expect BadReq
            expect(response.status).to.equal(StatusCodes.BAD_REQUEST);

            //Verify No Post
            let responseGetBooks = await axios.get(url);
            expect(responseGetBooks.status).to.equal(StatusCodes.OK);
            const numOfBooksAfter = responseGetBooks.data.length;
            expect(numOfBooksAfter).to.equal(numOfBooks);
        });

        it("BUG: Create book with no author", async () => {
            let book_b = {
                id: "2123787f-202e-413a-8325-a9e92b3313c0",
                name: "IT",
                author: "",
            };

            //Post Book no auth
            const response = await axios.post(url, book_b);
            //Expect BadReq
            expect(response.status).to.equal(StatusCodes.BAD_REQUEST);

            //Verify No Post
            let responseGetBooks = await axios.get(url);
            expect(responseGetBooks.status).to.equal(StatusCodes.OK);
            const numOfBooksAfter = responseGetBooks.data.length;
            expect(numOfBooksAfter).to.equal(numOfBooks);
        });
    });
});