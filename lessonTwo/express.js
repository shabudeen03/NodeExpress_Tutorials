const express = require('express');
const app = express();

const { authRouter } = require("./routes/authorRouter.js");

app.use("/authors", authRouter);

// app.get("*", (req, res) => {res.send("<h1>Page not found.</h1>")});

app.use((req, res, next) => {
    throw new Error("OH HO!");
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err.message);
    next();
});

const port = 3000;
app.listen(port, () => console.log("Server started on localhost:3000"));