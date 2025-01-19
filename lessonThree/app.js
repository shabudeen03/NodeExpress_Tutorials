const express = require('express');
const app = express();

const path = require("node:path");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

const links = [
    { href: "/", text: "Home" },
    { href: "about", text: "About" }
];

const users = ["Burhan", "Subhan", "Ghufran"];

app.get("/", (req, res) => {
    res.render("index", { links: links, users: users });
});

const owners = ["A", "B", "C", "D"];
const bios = ["lorem ipsum dipsum", "khatam ker dey", "why not me", "ahah oh ho!"];

app.get("/about", (req, res) => {
    res.render("about", { owners:owners, bios:bios });
});

const port = 3000;
app.listen(port, () => {
    console.log("Server started on port 3000!");
});