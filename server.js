// Import Express
const express = require("express");

// Create an Express app
const server = express();

server.listen(3000, () => {
  console.log("server is listening at http://localhost:3000");
});

server.get("/greetings/:name", (req, res) => {
  res.send(`What a delight it is to see you once more, ${req.params.name}.`);
});

server.get("/roll/:number", (req, res) => {
  if (!isNaN(req.params.number)) {
    const num = Math.floor(Math.random() * req.params.number);

    res.send(`You rolled a ${num}.`);
  } else {
    res.send(`You must specify a number.`);
  }
});

const collectibles = [
  { name: "shiny ball", price: 5.95 },
  { name: "autographed picture of a dog", price: 10 },
  { name: "vintage 1970s yogurt SOLD AS-IS", price: 0.99 },
];

server.get("/collectibles/:index", (req, res) => {
  if (req.params.index > collectibles.length - 1) {
    res.send("This item is not yet in stock. Check back soon!");
  } else {
    res.send(
      `So, you want the ${collectibles[req.params.index].name}? For ${
        collectibles[req.params.index].price
      }, it can be yours!`
    );
  }
});


const shoes = [
  { name: "Birkenstocks", price: 50, type: "sandal" },
  { name: "Air Jordans", price: 500, type: "sneaker" },
  { name: "Air Mahomeses", price: 501, type: "sneaker" },
  { name: "Utility Boots", price: 20, type: "boot" },
  { name: "Velcro Sandals", price: 15, type: "sandal" },
  { name: "Jet Boots", price: 1000, type: "boot" },
  { name: "Fifty-Inch Heels", price: 175, type: "heel" },
];

server.get("/shoes", (req, res) => {
  let result = [...shoes];

  if (req.query["min-price"]) {
    result = result.filter((item) => item.price > req.query["min-price"]);
  }

  if (req.query["max-price"]) {
    result = result.filter((item) => item.price < req.query["max-price"]);
  }

  if (req.query.type) {
    result = result.filter((item) => item.type === req.query.type);
  }

  res.send(result);
});
