const express = require('express');
const path = require('path');

const app = express();

const fetch_file_data = (filePath, res, statusCode=200) => {
    res.status(statusCode).sendFile(path.join(__dirname, filePath));
};

app.get("/", (req, res) => {
    return fetch_file_data("./index.html", res);
});

app.get("/about", (req, res) => {
    return fetch_file_data("./about.html", res);
});

app.get("/contact", (req, res) => {
    return fetch_file_data("./contact.html", res);
});

app.get("*", (req, res) => {
    return fetch_file_data("./404.html", res, statusCode=404);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});