const expect = require("chai").expect;
const server = require("../../build/server");
const api = require("supertest")(server);
const pick = require("lodash/pick");
const users = require("../fixtures/users");

function moviesTest() {
  let token = "";
  before(async () => {
    const premiumUser = pick(users[1], ["username", "password"]);
    const {body} = await api
      .post("/auth")
      .set("Accept", "application/json")
      .send(premiumUser);
    token = body.token;
  });
  it("movie - empty body", () =>
    api.post('/movies')
      .set("Accept", "application/json")
      .set("authorization", `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(400)
  )
  it("movie - proper movie", () =>
    api.post('/movies')
      .set("Accept", "application/json")
      .set("authorization", `Bearer ${token}`)
      .send({title:"Avatar"})
      .expect('Content-Type', /json/)
      .expect(200)
  )
  it("request with empty token", () =>
    api.post('/movies')
      .set("Accept", "application/json")
      .set("authorization", `Bearer `)
      .send({title:"Avatar"})
      .expect('Content-Type', /json/)
      .expect(401)
  )
  it("request without token", () =>
    api.post('/movies')
      .set("Accept", "application/json")
      .send({title:"Avatar"})
      .expect('Content-Type', /json/)
      .expect(401)
  )
}

module.exports = moviesTest;