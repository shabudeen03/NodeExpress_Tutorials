const { body, validationResult } = require('express-validator');
const userStorage = require('../storages/userStorage.js');

const alphaErr = "must contain only letters.";
const lengthErr = "must be between 1 and 10 characters.";

const validateUser = [
    body("firstName").trim()
        .isAlpha().withMessage(`First name ${alphaErr}`)
        .isLength({ min: 1, max: 10 }).withMessage(`First name ${lengthErr}`),

    body("lastName").trim()
        .isAlpha().withMessage(`Last name ${alphaErr}`)
        .isLength({ min: 1, max: 10 }).withMessage(`Last name ${lengthErr}`),
];

const userListGet = (req, res, next) => {
    res.render("index", {
        title: "User List",
        users: userStorage.getUsers()
    });
};

const userCreateGet = (req, res, next) => {
    res.render("createUser", { title: "Create User" });
};

const userCreatePost = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).render('createUser', {
            title: "Create user",
            errors: errors.array()
        });
    }

    const { firstName, lastName } = req.body;
    userStorage.addUser({ firstName, lastName });
    res.redirect('/');
};

const userUpdateGet = (req, res, next) => {
    const user = userStorage.getUser(req.params.id);
    res.render("updateUser", {
        title: "Update user",
        user: user
    });
};

const userUpdatePost = (req, res, next) => {
    const user = userStorage.getUser(req.params.id);
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).render("updateUser", {
            title: "Update user",
            user: user,
            errors: errors.array() 
        });
    }

    const { firstName, lastName } = req.body;
    userStorage.updateUser(req.params.id, { firstName, lastName });
    res.redirect("/");
};

const userDeletePost = (req, res, next) => {
    userStorage.deleteUser(req.params.id);
    res.redirect("/");
};

module.exports = { userCreateGet, userCreatePost, userUpdateGet, userUpdatePost, userListGet, userDeletePost };