const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", () => {
  test("Valid input 10L", (done) => {
    chai
      .request(server)
      .get("/api/convert?input=10L")
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 10);
        assert.equal(res.body.initUnit, "L");
        done();
      });
  });

  test("Invalid unit 32g", (done) => {
    chai
      .request(server)
      .get("/api/convert?input=32g")
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.text, "invalid unit");
        done();
      });
  });

  test("Invalid number 3/7.2/4kg", (done) => {
    chai
      .request(server)
      .get("/api/convert?input=3/7.2/4kg")
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.text, "invalid number");
        done();
      });
  });

  test("Invalid number and unit 3/7.2/4kilomegagram", (done) => {
    chai
      .request(server)
      .get("/api/convert?input=3/7.2/4kilomegagram")
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.text, "invalid number and unit");
        done();
      });
  });

  test("No number, only unit (kg)", (done) => {
    chai
      .request(server)
      .get("/api/convert?input=kg")
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 1);
        assert.equal(res.body.initUnit, "kg");
        done();
      });
  });
});
