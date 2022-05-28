const request = require("supertest");
const app = require("../app");

describe("GET /", () => {
    test("Gets the full list of boats", async () => {
        const response = await request(app).get("/");
        expect(response.statusCode).toBe(200);
    });
});