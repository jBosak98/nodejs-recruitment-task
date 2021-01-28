const expect = require("chai").expect;
const server = require("../../build/server");
const api = require("supertest")(server);
const pick = require("lodash/pick");
const users = require("../fixtures/users");

function moviesTest() {
  let token = "";
  beforeEach(async () =>
    api
      .post("/auth")
      .set("Accept", "application/json")
      .send(pick(users[1], ["username", "password"])).then((res, rej) => {
      token = res.body.token;
    })
  );
  it("movie - empty body", async () =>
      api.post('/movies')
        .set("Accept", "application/json")
        .set("authorization", `Bearer ${token}`)
        .expect(400)

  )
  it("movie - proper movie", async () =>
    api.post('/movies')
      .set("Accept", "application/json")
      .set("authorization", `Bearer ${token}`)
      .send({title: "Avatar"})
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res, rej) => {
        expect(res.body).to.have.property('title');
        expect(res.body).to.have.property('director');
        expect(res.body).to.not.have.property('something');
      })
  )
  it("request with empty token", async () => {
      await api.post('/movies')
        .set("Accept", "application/json")
        .set("authorization", `Bearer `)
        .send({title: "Avatar"})
        .expect('Content-Type', /json/)
        .expect(401);
    }
  )
  it("request without token", async () => {
      await api.post('/movies')
        .set("Accept", "application/json")
        .send({title: "Avatar"})
        .expect('Content-Type', /json/)
        .expect(401);
    }
  )
}

module.exports = moviesTest;