const axios = require("axios");
const { expect, assert } = require("chai");
const { StatusCodes } = require("http-status-codes");
const urlBase = "http://localhost:4200/books";

describe("Delete Books Testing API", () => {

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

    describe("Delete Test", () => {

        it("Delete Book", async () => {

            //verify deletion
            const response = await axios.delete(urlBase+"/"+book_a.id);
            expect(response.status).to.equal(StatusCodes.OK);
        });

        it("NO DOUBLE DELETE"), async () => {

            //Verify Normal Deletion
            const response = await axios.delete(urlBase+'/'+book_a.id);
            expect(response.status).to.equal(StatusCodes.OK);

            //Verify No Deletion
            const response2 = await axios.delete(urlBase+'/'+book_a.id);
            expect(response2.status).to.equal(StatusCodes.BAD_REQUEST);
        };
    });
});