const axios = require("axios");
const { expect, assert } = require("chai");
const { StatusCodes } = require("http-status-codes");
const url = "http://localhost:4200/books";


describe("Add Books Testing API", () => {

    let book_a;

    beforeEach(async () => {
    let responseGetBooks = await axios.get(url);
    });

    describe("Adding Test", () => {

        it("Create book", async () => {

            let nBook = {
              id: "1123787f-202e-413a-8325-a9e92b3313c0",
              name: "El nombre del viento",
              author: "Patrick Rothfuss"
            };

            //Post the new Book
            const response = await axios.post(url, nBook);
            book_a = response.data;
            expect(response.status).to.equal(StatusCodes.OK);


            //Verify Book Name
            expect(nBook.name).to.be.oneOf(responseGetBooks.data.map(function (book) {

                return book.name;
            }));

            //Verify Book Auth
            expect(nBook.author).to.be.oneOf(responseGetBooks.data.map(function (book) {
                    return book.author;
            }));
        });
    });

    describe("No Adding Test", () => {

        it("NO NAME, NO ADD", async () => {

            let book_a = {

            id: "1123787f-202e-413a-8325-a9e92b3313c0",
            name: "",
            author: "Patrick Rothfuss",
            };

            //Post Book no Name
            const response = await axios.post(url, book_a);
            //Expect BadReq
            expect(response.status).to.equal(StatusCodes.BAD_REQUEST);

        });

        it("NO AUTHOR, NO ADD", async () => {
            let book_b = {
                id: "2123787f-202e-413a-8325-a9e92b3313c0",
                name: "IT",
                author: "",
            };

            //Post Book no auth
            const response = await axios.post(url, book_b);
            //Expect BadReq
            expect(response.status).to.equal(StatusCodes.BAD_REQUEST);

        });
    });
});