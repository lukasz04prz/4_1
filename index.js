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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});