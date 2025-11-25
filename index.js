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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});