const { Router } = require('express');
const authRouter = Router();

const { getAuthorById } = require('../controllers/authorController.js');

authRouter.get("/:authorId", getAuthorById);

module.exports = { authRouter };