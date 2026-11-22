function calculateTax(income) {
  if (typeof income !== "number" || Number.isNaN(income) || income < 0) {
    throw new Error("Income must be a non-negative number");
  }

  if (income <= 10000) {
    return Number((income * 0.1).toFixed(2));
  } else if (income <= 50000) {
    return Number((10000 * 0.1 + (income - 10000) * 0.2).toFixed(2));
  } else {
    return Number(
      (10000 * 0.1 + 40000 * 0.2 + (income - 50000) * 0.3).toFixed(2),
    );
  }
}

module.exports = { calculateTax };
