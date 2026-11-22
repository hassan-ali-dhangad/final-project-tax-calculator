const { calculateTax } = require("../src/taxCalculator");

describe("Tax Calculator", function () {
  it("should return 0 tax for 0 income", function () {
    expect(calculateTax(0)).toBe(0);
  });

  it("should calculate 10% tax for low income up to 10000", function () {
    expect(calculateTax(5000)).toBe(500);
  });

  it("should calculate 10% tax at exact 10000 threshold", function () {
    expect(calculateTax(10000)).toBe(1000);
  });

  it("should calculate progressive tax for income between 10001 and 50000", function () {
    expect(calculateTax(20000)).toBe(3000);
  });

  it("should calculate progressive tax at exact 50000 threshold", function () {
    expect(calculateTax(50000)).toBe(9000);
  });

  it("should calculate progressive tax for income above 50000", function () {
    expect(calculateTax(60000)).toBe(14000);
  });

  it("should throw an error for negative income", function () {
    expect(function () {
      calculateTax(-100);
    }).toThrowError("Income must be a non-negative number");
  });
});
