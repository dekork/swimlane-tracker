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
        return request(app).post("/api/addboat")
            .send({vessel_name: "Test2boat3dfas52624", operator_name: "Oper@tor3250dfs823"})
            .set('Accept', 'application/json')
            .expect(200)
            .then((res) => {
                connection.query('DELETE from boats WHERE id=?', res.text);
            });
    });
});


describe("POST /api/editboat/:id", () => {
    test("Add a boat successfully then edit, then delete manually in SQL", async () => {
        request(app).post("/api/addboat")
            .send({vessel_name: "Test2boat352ewrt624", operator_name: "Oper@tor32trew50823"})
            .set('Accept', 'application/json').then((res) => {
            let id = res.text;
            request(app).post("/api/editboat/" + id).send(
                {vessel_name: "simplerboatname123", operator_name: "Operatornotypo"})
                .set('Accept', 'application/json')
                .expect(200).then((res) => {
                connection.query('SELECT * from boats WHERE id=' + id, function (error, results) {
                    if (error)
                        fail('SQL error');
                    if (results.vessel_name !== "simplerboatname123" || results.operator_name !== "Operatornotypo") {
                        fail('The edited data was not stored correctly!');
                    }
                    connection.query('DELETE from boats WHERE id=' + id);
                });
            });
        });
    });
});


//TODO: add test for /deleteboat/:id
describe("POST /api/deleteboat/:id", () => {
    test("Add a boat successfully then delete", async () => {

        request(app).post("/api/addboat")
            .send({vessel_name: "Test2boat3trew5123123422", operator_name: "Oper@tor325082222243213"})
            .set('Accept', 'application/json').then((res) => {
            let id = res.text;
            request(app).post("/api/deleteboat/" + id).send()
                .expect(200).then((res) => {
                connection.query('SELECT * from boats WHERE id=' + id, function (error, results) {
                    if (error)
                        fail('SQL error');
                    console.log("RESULTS: ");
                    console.log(results);
                });
            });
        });
    });
});

