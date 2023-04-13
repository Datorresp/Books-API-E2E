const axios = require("axios");
const { expect, assert } = require("chai");
const { StatusCodes } = require("http-status-codes");
const urlBase = "http://localhost:4200/books";

describe("Update Books Testing API", () => {

    let book_a;

    beforeEach(async () => {

        let nBook = {

            id: "1123787f-202e-413a-8325-a9e92b3313c0",
            name: "El nombre del viento",
            author: "Patrick Rothfuss"
        };

        //Creating Book
        let response= await axios.post(urlBase, nBook);
        book_a = response.data;
    });


    describe("Update Test", () => {

        it("UPDATE NAME & AUTH", async () => {

        let updateBook = {

            name: "La Odisea",
            author: "Homero"
        }

        //Update The Book
        const response = await axios.put(urlBase+'/'+book_a.id, updateBook);
        expect(response.status).to.equal(StatusCodes.OK);

        // Verify the real update
        expect(response.data.name).to.equal(updateBook.name);
        expect(response.data.author).to.equal(updateBook.author);

    });

        it("UPDATE AUTHOR", async () => {

            let updateBook = {

                name: book_a.name,
                author: "Homero"
            }

            //Update the book
            const response = await axios.put(urlBase+'/'+book_a.id, updateBook);
            expect(response.status).to.equal(StatusCodes.OK);

            // Verify only the author
            expect(response.data.name).to.equal(book_a.name);
            expect(response.data.author).to.equal(updateBook.author);
        });

        it("UPDATE NAME", async () => {

            let updateBook = {

                name: "La Odisea",
                author: book_a.author
            }

            //Update the book
            const response = await axios.put(urlBase+'/'+book_a.id, updateBook);
            expect(response.status).to.equal(StatusCodes.OK);

            // Verify only the name
            expect(response.data.name).to.equal(updateBook.name);
            expect(response.data.author).to.equal(book_a.author);
        });


        it("NO PARAMETERS, NO UPDATE", async () => {

            let bookUpdated = {

                name: "",
                author: ""
            }

            //Verify Bad Request no update
            const response = await axios.put(urlBase+'/'+newBook.id, bookUpdated);
            expect(response.status).to.equal(StatusCodes.BAD_REQUEST);
        });

        afterEach(async () => {

            await axios.delete(urlBase+'/'+book_a.id);
        });
    });
});