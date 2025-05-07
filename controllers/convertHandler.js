"use strict";
function ConvertHandler() {
  // Use lowercase keys for lookup
  const units = {
    gal: { returnUnit: "L", convert: (v) => v * 3.78541, spellOut: "gallons" },
    l: { returnUnit: "gal", convert: (v) => v / 3.78541, spellOut: "liters" },
    mi: { returnUnit: "km", convert: (v) => v * 1.60934, spellOut: "miles" },
    km: {
      returnUnit: "mi",
      convert: (v) => v / 1.60934,
      spellOut: "kilometers",
    },
    lbs: { returnUnit: "kg", convert: (v) => v * 0.453592, spellOut: "pounds" },
    kg: {
      returnUnit: "lbs",
      convert: (v) => v / 0.453592,
      spellOut: "kilograms",
    },
  };

  this.getNum = function (input) {
    if (!input || typeof input !== "string") return "invalid number";

    // Find the first letter in the input
    const firstLetterIndex = input.search(/[a-zA-Z]/);
    if (firstLetterIndex === -1) return "invalid number";

    // Extract the number part
    const numStr = input.substring(0, firstLetterIndex);
    if (!numStr) return 1; // Default to 1 if no number provided

    // Check for multiple fractions
    if ((numStr.match(/\//g) || []).length > 1) return "invalid number";

    try {
      const evaluated = eval(numStr);
      return isNaN(evaluated) ? "invalid number" : evaluated;
    } catch {
      return "invalid number";
    }
  };

  this.getUnit = function (input) {
    if (!input || typeof input !== "string") return "invalid unit";

    // Find the first letter in the input
    const firstLetterIndex = input.search(/[a-zA-Z]/);
    if (firstLetterIndex === -1) return "invalid unit";

    // Extract the unit part
    const unit = input.substring(firstLetterIndex).toLowerCase();
    if (!units[unit]) return "invalid unit";

    // Return uppercase 'L' for liter, lowercase for others
    return unit === "l" ? "L" : unit;
  };

  this.getReturnUnit = function (initUnit) {
    if (!initUnit || typeof initUnit !== "string") return "invalid unit";
    const lower = initUnit.toLowerCase();
    return units[lower] ? units[lower].returnUnit : "invalid unit";
  };

  this.spellOutUnit = function (unit) {
    if (!unit || typeof unit !== "string") return "invalid unit";
    const lower = unit.toLowerCase();
    return units[lower] ? units[lower].spellOut : "invalid unit";
  };

  this.convert = function (num, unit) {
    if (num === "invalid number" || unit === "invalid unit")
      return "invalid number";
    const lower = unit.toLowerCase();
    if (!units[lower]) return "invalid unit";

    const fn = units[lower].convert;
    const result = fn(Number(num));
    return parseFloat(result.toFixed(5));
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    if (initNum === "invalid number" || initUnit === "invalid unit") {
      return "invalid number and unit";
    }
    const inSpell = this.spellOutUnit(initUnit);
    const outSpell = this.spellOutUnit(returnUnit);
    return `${initNum} ${inSpell} converts to ${returnNum} ${outSpell}`;
  };
}

module.exports = ConvertHandler;
