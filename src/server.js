const express = require("express");
const path = require("path");
const { calculateTax } = require("./taxCalculator");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Tax Calculator App</title>
    </head>
    <body>
      <h1>Tax Calculator</h1>
      <input id="income" type="number" placeholder="Enter income" />
      <button onclick="calc()">Calculate Tax</button>
      <p id="result"></p>
      <script>
        async function calc() {
          const income = Number(document.getElementById("income").value);
          const response = await fetch("/api/tax?income=" + encodeURIComponent(income));
          const data = await response.json();
          document.getElementById("result").innerText =
            data.error ? data.error : "Tax: $" + data.tax;
        }
      </script>
    </body>
    </html>
  `);
});

app.get("/api/tax", (req, res) => {
  const income = Number(req.query.income);
  try {
    const tax = calculateTax(income);
    res.json({ income, tax });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(\`Tax Calculator running on port \${PORT}\`);
  });
}

module.exports = app;