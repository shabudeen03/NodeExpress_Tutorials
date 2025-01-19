// Practice module, group a bunch of related routes of a part of site

//Access these using a common prefix, say "/module/" and "/module/about"

// const express = require("express");
const { Router } = require("express");
const router = Router();
    //Adding routes to Router object is just like adding routes to the app object

// Home page route
router.get("/", function(req, res) {
    res.send("home page");
});

// About page route
router.get("/about", function(req, res) {
    res.send("About page");
});

router.get("/*", (req, res) => {
    res.send("<h1>Page not found.</h1> Error 404!");
})

module.exports = router; //export the Router object, handles / and /about