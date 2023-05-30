const express = require("express");
const connection = require("../connection");
const router = express.Router();

router.post('/create', (req, res, next) => {
    let book = req.body;
    query = "insert into book (book_name,author,price)  values(?,?,?)";
    connection.query(query, [book.book_name, book.author, book.price], (err, results) => {
        if (!err) {
            return res.status(200).json({ message: "Book added succesfully" });
        }
        else {
            return res.status(500).json(err);
        }
    });
});

router.get('/read', (req, res, next) => {
    var query = "select * from book";
    connection.query(query, (err, results) => {
        if (!err) {
            return res.status(200).json(results);
        }
        else {
            return res.status(500).json(err);
        }
    });

});

router.patch('/update/:id', (req, res, next) => {
    const id = req.params.id;
    let book = req.body;
    var query = "update book set book_name=?,author=?,price=? where id=?";
    connection.query(query, [book.book_name, book.author, book.price, id], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "Product id does not found" });
            }

            return res.status(200).json({ message: "Product updated successfully" });

        }
        else {
            return res.status(500).json(err);
        }
    });
});

router.delete('/delete/:id', (req, res, next) => {
    const id = req.params.id;
    var query = "delete from book where id=?";
    connection.query(query, [id], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "Product id does not found" });
            }
            return res.status(200).json({ message: "Product deleted successfully" });
        }
        else{
            return res.status(500).json(err);
        }
    });

});

module.exports = router;