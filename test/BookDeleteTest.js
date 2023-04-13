const axios = require("axios");
const { expect, assert } = require("chai");
const { StatusCodes } = require("http-status-codes");
const url = "http://localhost:4200/books";

describe("Delete Books Testing API", () => {

    let numOfBooks;
    let book_a;

    beforeEach(async () => {
        let nBook = {
            id: "1123787f-202e-413a-8325-a9e92b3313c0",
            name: "El nombre del viento",
            author: "Patrick Rothfuss"
        };
        let response= await axios.post(url, nBook);
        book_a = response.data;
        let books = await axios.get(url);
        numOfBooks = books.data.length;

    });

    describe("Delete Test", () => {

        it("Delete Book", async () => {

            const response = await axios.delete(url+"/"+book_a.id);
            expect(response.status).to.equal(StatusCodes.OK);
        });
    });

    describe("No Delete Test", () => {

        it("NO DELETE"), async () => {
            const response = await axios.delete(url+'/'+book_a.id);
            expect(response.status).to.equal(StatusCodes.OK);

            const responseDeleteAgain = await axios.delete(url+'/'+book_a.id);
            expect(responseDeleteAgain.status).to.equal(StatusCodes.BAD_REQUEST);
        });
    });
});