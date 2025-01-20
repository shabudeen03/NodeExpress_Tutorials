const { body, validationResult } = require('express-validator');
const userStorage = require('../storages/userStorage.js');

const alphaErr = "must contain only letters.";
const lengthErr = "must be between 1 and 10 characters.";
const emailErr = "must be proper email.";
const ageErr = "must be between 18 and 120."
const bioErr = "must be at most 200 characters."

const validateUser = [
    body("firstName").trim()
        .isAlpha().withMessage(`First name ${alphaErr}`)
        .isLength({ min: 1, max: 10 }).withMessage(`First name ${lengthErr}`),

    body("lastName").trim()
        .isAlpha().withMessage(`Last name ${alphaErr}`)
        .isLength({ min: 1, max: 10 }).withMessage(`Last name ${lengthErr}`),

    body("email").trim()
        .isEmail().withMessage(`Email ${emailErr}`),

    body("age").trim()
        .optional({ checkFalsy: true })
        .isInt({ min: 18, max: 120 }).withMessage(`Age ${ageErr}`),

    body("bio").trim()
        .optional({ checkFalsy: true })
        .isLength({ max: 200 }).withMessage(`Bio ${bioErr}`)
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

    const { firstName, lastName, email, age, bio } = req.body;
    userStorage.addUser({ firstName, lastName, email, age, bio });
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

    const { firstName, lastName, email, age, bio } = req.body;
    userStorage.updateUser(req.params.id, { firstName, lastName, email, age, bio });
    res.redirect("/");
};

const userDeletePost = (req, res, next) => {
    userStorage.deleteUser(req.params.id);
    res.redirect("/");
};

const userSearchGet = (req, res, next) => {
    const { search } = req.query;
    const users = userStorage.getUsers();

    const searchWords = search.split(" ");
    const returnList = [];
    for(let j=0; j<users.length; j++) {
        const user = users[j];

        for(let i=0; i<searchWords.length; i++) {
            const word = searchWords[i];
            
            const firstName = user.firstName;
            const lastName = user.lastName;
            const email = user.email;
            const emailUnique = email.substring(0, email.indexOf("@"));
            if(firstName.indexOf(word) > -1 || lastName.indexOf(word) > -1 || emailUnique.indexOf(word) > -1) {
                returnList.push(user);
            }
        }
    }

    res.render("search", { title: "Search Results", users: returnList });
}

module.exports = { userCreateGet, userCreatePost, userUpdateGet, userUpdatePost, userListGet, userDeletePost, validateUser, userSearchGet };