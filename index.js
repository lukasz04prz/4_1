'use strict';

const express = require('express');
const app = express();

// define endpoint for exercise 1 here
app.get('/math/circle/:r', (req, res) => {
//TODO1  
  const r = parseFloat(req.params.r);

  if (isNaN(r))
  {return res.status(400).json({ error: 'Promień musi być liczbą' });}

  const area = (Math.PI * Math.pow(r, 2)).toFixed(2);
  const circumference = (2 * Math.PI * r).toFixed(2);

  const result = {
    area: area,
    circumference: circumference
  }

  res.json(result);
});

//TODO2
app.get('/math/rectangle/:a/:b', (req, res) => {

  const a = parseFloat(req.params.a);
  const b = parseFloat(req.params.b);

  if (isNaN(a) || isNaN(b))
  {return res.status(400).json({ error: 'Wysokość i szerokość musza być liczbami' });}

  const area = (a*b).toFixed(2);
  const perimeter = 2 * (a + b).toFixed(2);

  const result = {
    area: area,
    perimeter: perimeter
  }

  res.json(result);
});

//TODO3
app.get('/math/power/:base/:exponent', (req, res) => {
  const base = parseFloat(req.params.base);
  const exponent = parseFloat(req.params.exponent);
  const root = req.query.root;

  if (isNaN(base) || isNaN(exponent)) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  const response = {
    result: Math.pow(base, exponent)
  };

  if (root === 'true') {
    response.root = Math.sqrt(base);
  }

  res.json(response);
});

function isPrime(n) {
  if (n <= 1) {
    return false;
  }
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
}

app.get("/math/isprime/:n", (req, res) => {
  const n = req.params.n;

  const numN = parseInt(n);
  
  if (n === "" || numN <= 1) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const response = {
    number: numN,
    isPrime: isPrime(numN),
  };

  res.json(response);
});

app.get('/math/gcdlcm/:a/:b', (req, res) => {
  const a = parseInt(req.params.a);
  const b = parseInt(req.params.b);

  if (isNaN(a) || isNaN(b))
    {return res.status(400).json({ error: 'Invalid input' });}

  const gcd = (a, b) =>
    b === 0 ? a : gcd(b, a % b)
  const lcm = (a, b) => (a * b) / gcd(a, b);
  const result = {
    gcd: gcd(a, b),
    lcm: lcm(a, b)
  }
  res.json(result);
});

app.get('/math/average', (req, res) => {
  const nums = req.query.nums.split(',').map(Number);

  if (nums.some(isNaN))
    {return res.status(400).json({ error: 'Invalid input' });}

  const average = nums.reduce((a, b) => a + b, 0) / nums.length;
  const geometricMean = Math.pow(nums.reduce((a, b) => a * b, 1), 1 / nums.length)
  const harmonicMean = nums.length / nums.reduce((a, b) => a + 1 / b, 0)

  const result = {
    average: average,
    geometricMean: geometricMean,
    harmonicMean: harmonicMean
  }

  res.json(result);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});