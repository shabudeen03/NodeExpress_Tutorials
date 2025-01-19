const express = require('express');
const app = express();

const path = require("node:path");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const { body, validationResult } = require('express-validator');

const port = 3000;
app.listen(port, () => {
    console.log(`Server started listening on localhost:${port}`);
});