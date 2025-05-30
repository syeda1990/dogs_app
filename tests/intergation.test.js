// Mocka hela database-modulen
jest.mock("../database");

const request = require("supertest");
const app = require("../server");



const database = require("../database");

describe("Dog routes", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Nollställ mockar mellan tester
  });

  test("GET /dogs returns list of dogs", async function () {
    // Fake data att returnera
    const fakeDogs = [
      { name: "Fido", age: 5, nick: "F" },
      { name: "Bella", age: 3, nick: "Bells" }
    ];

    // Mocka getAllDogs
    database.getAllDogs.mockImplementation((callback) => {
      callback(null, fakeDogs);  
    });

    const response = await request(app).get("/dogs");

    expect(response.statusCode).toBe(200);
    expect(response.text).toContain("Fido");
    expect(response.text).toContain("Bella");
  });

  test("POST /dogs creates a dog and returns updated list", async function () {
    const fakePostResult = [
      { name: "Fido", age: 5, nick: "F" },
      { name: "NewDog", age: 2, nick: "ND" }
    ];

    // Mocka createDog
    database.createDog.mockImplementation((name, age, nick, callback) => {
      callback(null, fakePostResult);
    });

    const response = await request(app)
      .post("/dogs")
      .send("name=NewDog&age=2&nick=ND");

    expect(response.statusCode).toBe(200);
    expect(response.text).toContain("NewDog");
    expect(response.text).toContain("Fido");
  });
});

//DELETING THE DOG  
test("GET/delete/:id deletes user and redirects",async () => {
    database.deleteDog.mockImplementation((id, cb) => cb(null));

    const response = await request(app).get("/delete/1");

    expect(response.statusCode).toBe(302);
    expect(response.headers.location).toBe("/dogs");
  });