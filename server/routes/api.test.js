const app = require("../app");
const connection = require("../config/database")
const request = require("supertest");

// Simple test of getting full list of boats from api
describe("GET /api/list", () => {
    test("Gets the full list of boats", async () => {
        return request(app).get("/api/list").expect(200);
    });
});

// Test adding a boat, then remove the added boat in sql to keep data unaltered.
describe("POST /api/addboat", () => {
    test("Add a boat successfully then delete manually in SQL", async () => {
        return request(app)
            .post("/api/addboat")
            .send({vessel_name: "Test2boat352624", operator_name: "Oper@tor3250823"})
            .set('Accept', 'application/json')
            .expect(200)
            .then((res) => {
                connection.query('DELETE from boats WHERE id=?',res.text);
            });
    });
});

//TODO: add test for /editboat/:id

//TODO: add test for /deleteboat/:id