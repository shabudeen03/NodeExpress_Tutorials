const express = require('express');
const app = express();

const path = require('node:path');
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

const { userRouter } = require('./routes/userRouter.js');
app.use("/", userRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}/`);
});