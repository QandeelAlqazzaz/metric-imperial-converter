const chai = require("chai");
const assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");
let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  test("Whole number input", () =>
    assert.equal(convertHandler.getNum("32L"), 32));
  test("Decimal input", () =>
    assert.equal(convertHandler.getNum("3.1mi"), 3.1));
  test("Fractional input", () =>
    assert.equal(convertHandler.getNum("1/2km"), 0.5));
  test("Fraction with decimal", () =>
    assert.equal(convertHandler.getNum("5.4/3kg"), 1.8));
  test("Double fraction input", () =>
    assert.equal(convertHandler.getNum("3/2/3kg"), "invalid number"));
  test("Default to 1", () => assert.equal(convertHandler.getNum("kg"), 1));
  test("Valid units", () => {
    ["gal", "L", "mi", "km", "lbs", "kg"].forEach((unit) => {
      assert.equal(
        convertHandler.getUnit(`1${unit}`),
        unit === "l" ? "L" : unit
      );
    });
  });
  test("Invalid unit", () =>
    assert.equal(convertHandler.getUnit("3megagram"), "invalid unit"));
  test("Return correct unit", () =>
    assert.equal(convertHandler.getReturnUnit("gal"), "L"));
  test("Spell out units", () =>
    assert.equal(convertHandler.spellOutUnit("kg"), "kilograms"));
  test("Convert gal to L", () =>
    assert.approximately(convertHandler.convert(1, "gal"), 3.78541, 0.1));
  test("Convert L to gal", () =>
    assert.approximately(convertHandler.convert(1, "L"), 0.26417, 0.1));
  test("Convert mi to km", () =>
    assert.approximately(convertHandler.convert(1, "mi"), 1.60934, 0.1));
  test("Convert km to mi", () =>
    assert.approximately(convertHandler.convert(1, "km"), 0.62137, 0.1));
  test("Convert lbs to kg", () =>
    assert.approximately(convertHandler.convert(1, "lbs"), 0.45359, 0.1));
  test("Convert kg to lbs", () =>
    assert.approximately(convertHandler.convert(1, "kg"), 2.20462, 0.1));
});
