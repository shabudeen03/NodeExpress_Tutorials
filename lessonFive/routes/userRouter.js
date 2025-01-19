const { Router } = require('express');
const userRouter = Router();

const userController = require('../controllers/userController.js');

userRouter.get("/", userController.userListGet);

userRouter.get('/create', userController.userCreateGet);
userRouter.post('/create', userController.userCreatePost);

userRouter.get("/:id/update", userController.userUpdateGet);
userRouter.post("/:id/update", userController.userUpdatePost);

userRouter.post("/:id/delete", userController.userDeletePost);

module.exports = { userRouter };