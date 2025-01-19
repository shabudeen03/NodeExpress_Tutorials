const db = require("../db.js");
const asyncHandler = require('express-async-handler');

const getAuthorById = asyncHandler(async (req, res) => {
    const { authorId } = req.params;

    const author = await db.getAuthorById(Number(authorId));

    if(!author) {
        res.status(404).send("Author not found.");
        return;
    }

    res.send(`Author name: ${author.name}`);
});

module.exports = { getAuthorById };