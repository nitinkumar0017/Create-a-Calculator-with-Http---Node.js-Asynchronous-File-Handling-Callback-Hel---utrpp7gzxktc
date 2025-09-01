const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  if (req.url !== "/calculate" || req.method !== "GET") {
    res.writeHead(404);
    res.end("Not Found");
    return;
  }

  let lst;
  try {
    lst = fs.readFileSync(path.join(__dirname, "..", "inputs.txt"), "utf-8");
  } catch (err) {
    res.writeHead(500);
    res.end("Unable to write result");
    return;
  }

  const parts = lst.trim().split("\n");
  if (parts.length < 3) {
    res.writeHead(400);
    res.end("Invalid Input Format");
    return;
  }

  const num1 = Number(parts[0]);
  const num2 = Number(parts[1]);
  const str = parts[2].trim().toLowerCase();

  if (isNaN(num1) || isNaN(num2)) {
    res.writeHead(400);
    res.end("Invalid Number");
    return;
  }

  let result;
  if (str === "add") {
    result = num1 + num2;
  } else if (str === "subtract") {
    result = num1 - num2;
  } else if (str === "multiply") {
    result = num1 * num2;
  } else if (str === "divide") {
    if (num2 === 0) {
      res.writeHead(400);
      res.end("Division by zero");
      return;
    }
    result = num1 / num2;
  } else {
    res.writeHead(400);
    res.end("Invalid Operator");
    return;
  }

  try {
    fs.writeFileSync(path.join(__dirname, "..", "result.txt"), String(result));
  } catch (err) {
    res.writeHead(500);
    res.end("Unable to write result");
    return;
  }

  res.writeHead(200);
  res.end(String(result));
});

// Do not modify this
server.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

// Export for testing
module.exports = server;
