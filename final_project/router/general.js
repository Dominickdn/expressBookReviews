const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  // return res.status(300).json({message: "Yet to be implemented"});
  const username = req.body.username;
  const password = req.body.password;

  // Check if both username and password are provided
  if (username && password) {
      // Check if the user does not already exist
      if (!doesExist(username)) {
          // Add the new user to the users array
          users.push({"username": username, "password": password});
          return res.status(200).json({message: "User successfully registered. Now you can login"});
      } else {
          return res.status(404).json({message: "User already exists!"});
      }
  }
  // Return error if username or password is missing
  return res.status(404).json({message: "Unable to register user."});
});

// Check if a user with the given username already exists
const doesExist = (username) => {
  // Filter the users array for any user with the same username
  let userswithsamename = users.filter((user) => {
      return user.username === username;
  });
  // Return true if any user with the same username is found, otherwise false
  if (userswithsamename.length > 0) {
      return true;
  } else {
      return false;
  }
}


// Get the book list available in the shop Implementation without promises
// public_users.get('/',function (req, res) {
//   //Write your code here
//   return res.send(JSON.stringify({books}, null, 4));
// });

// fetches books with promise
const fetchBooks = () => {
  return new Promise((resolve, reject) => {
      resolve(books);
  });
};

// Get the book list available in the shop Implementation with promises
public_users.get('/', async function (req, res) {
  try {
    const listOfBooks = await fetchBooks(); 
    res.json(listOfBooks); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving book list" });
  }
});


// // Get book details based on ISBN Implementation without promises
// public_users.get('/isbn/:isbn',function (req, res) {
//   //Write your code here
//   const bookID = parseInt(req.params.isbn);
//   const book = books[bookID]
//  //return res.status(300).json({message: "Yet to be implemented"});
//   return res.send(JSON.stringify({book}, null, 4));
 
//  });

public_users.get('/isbn/:isbn',async function (req, res) {
  try {
    const bookID = parseInt(req.params.isbn);
    const listOfBooks = await fetchBooks(); 
    const book = listOfBooks[bookID]
    res.json(book)
  } catch {
    res.status(500).json({ message: "Error retrieving book" });
  }
 });
  
// // Get book details based on author Implementation without promises
// public_users.get('/author/:author',function (req, res) {
//   //Write your code here
//   const author = req.params.author;
//   const filteredBooks = Object.values(books).filter(book => book.author === author);

//   // return res.status(300).json({message: "Yet to be implemented"});
//   return res.send(JSON.stringify({filteredBooks}, null, 4));
// });

// Get book details based on author Implementation with promises

public_users.get('/author/:author',async function (req, res) {
  try {
    const author = req.params.author;
    const listOfBooks = await fetchBooks();

    const filteredBooks = Object.values(listOfBooks).filter(book =>
      book.author === author
    );

    res.json(filteredBooks);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving books by author", error: error.message });
  }
 });

// // Get all books based on title without promises
// public_users.get('/title/:title',function (req, res) {
//   //Write your code here
//   const title = req.params.title;
//   const filteredBooks = Object.values(books).filter(book => book.title === title);
//   // return res.status(300).json({message: "Yet to be implemented"});
//   return res.send(JSON.stringify({filteredBooks}, null, 4));
// });

// Get all books based on title with promises
public_users.get('/title/:title',async function (req, res) {
  try {
    const title = req.params.title;
    const listOfBooks = await fetchBooks();
    const filteredBooks = Object.values(listOfBooks).filter(book => book.title === title);

    res.json(filteredBooks)
  }catch (error) {
    res.status(500).json({ message: "Error retrieving books by title", error: error.message });
  }
});

//  Get book review Implementation without promises
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const bookID = parseInt(req.params.isbn);
  const book = books[bookID]

  const review = book.reviews

  // return res.status(300).json({message: "Yet to be implemented"});
  return res.send(JSON.stringify({review}, null, 4));
});

module.exports.general = public_users;
