const authors = [
    { id: 1, name: "Subhan" },
    { id: 2, name: "Burhan" },
    { id: 3, name: "Rohan" }
];

async function getAuthorById(authorId) {
    return authors.find(author => author.id === authorId);
};

module.exports = { getAuthorById };