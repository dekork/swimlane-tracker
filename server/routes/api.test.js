const app = require("../app");
const request = require("supertest");

describe("GET /", () => {
    test("Gets the full list of boats", async () => {
        return request(app).get("/").expectToBe(200);
    });
});


