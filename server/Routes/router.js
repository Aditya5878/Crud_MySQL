const express = require("express");
const router = new express.Router();
const conn = require("../db/conn");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const salt = 10;



// register a user

router.post("/create", (req, res) => {
  const { name, email, age, mobile, work, add, desc } = req.body;

  if (!name || !email || !age || !mobile || !work || !add || !desc) {
    return res.status(422).json({ error: "Plz fill the form properly" });
  }

  try {
    conn.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (err, results) => {
        // if email already exists
        if (results.length > 0) {
         
          return res.status(422).json({ error: "Email already exists" });
          // console.log(err);
        } else {
          conn.query(
            "INSERT INTO users SET ?",
            { name, email, age, mobile, work, add, desc },
            (err, results) => {
              if (err) {
                console.log("err" + err);
              } else {
                res.status(201).json(req.body);
              }
            }
          );
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
});


// In your server-side route handler
router.get("/getusers", async (req, res) => {
  const { searchTerm, limit = 5, page = 1 } = req.query;

  // Ensure limit and page are numbers
  const limitNum = parseInt(limit, 10);
  const pageNum = parseInt(page, 10);

  // Calculate offset
  const offset = (pageNum - 1) * limitNum;

  let query = "SELECT * FROM users";
  if (searchTerm) {
    query += " WHERE name LIKE ?";
  }

  // Append LIMIT and OFFSET to the query
  query += " LIMIT ? OFFSET ?";

  // Execute the query with parameters in the correct order
  conn.query(
    query,
    searchTerm ? [`%${searchTerm}%`, limitNum, offset] : [limitNum, offset],
    (err, results) => {
      if (err) {
        console.log("no data found" + err);
      } else {
        res.status(201).json(results);
      }
    }
  );
});

// delete a user

router.delete("/deleteuser/:id", (req, res) => {
  const id = req.params.id;
  conn.query("DELETE FROM users WHERE id = ?", id, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      res.status(201).json(results);
    }
  });
});

// view a user

router.get("/viewuser/:id", (req, res) => {
  const id = req.params.id;
  conn.query("SELECT * FROM users WHERE id = ?", id, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      res.status(201).json(results);
    }
  });
});

// update a user

router.patch("/updateuser/:id", (req, res) => {
  const id = req.params.id;
  const data = req.body;
  conn.query("UPDATE users SET ? WHERE id = ?", [data, id], (err, results) => {
    if (err) {
      console.log(err);
    } else {
      res.status(201).json(results);
    }
  });
});

//                                                      authentication
// create account
router.post("/CreateAccount", (req, res) => {
  const query = "INSERT INTO login (`name` ,`email` ,`password`) VALUES (?)";
  bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
    if (err) return res.json({ Status: "Hashing Failed" });
    const values = [req.body.name, req.body.email, hash];
    conn.query(query, [values], (err, results) => {
      if (err) {
        return res.json({ Status: "Inserting Data Failed" });
      } else {
        res.json({ Status: "Success" });
      }
    });
  });
});

// login

router.post("/Login", (req, res) => {
    const { email, password } = req.body;
 
    const query = "SELECT * FROM login WHERE email = ?";
    conn.query(query, [email], (err, results) => {
        if (err) {
        return res.json({ Status: "Failed" });
        }
        if (results.length === 0) {
        return res.json({ Status: "Invalid Email" });
        }
        bcrypt.compare(password, results[0].password, (err, result) => {
        if (err) {
            return res.json({ Status: "Failed" });
        }
        if (result) {
            const name = results[0].name;
            const token = jwt.sign({name},"jwt-secret-key", {expiresIn: "1d"}); 
            res.cookie("token", token, {httpOnly: true}); 

            return res.json({ Status: "Success" });
        } else {
            return res.json({ Status: "Invalid Password" });
        }
        });
    });
    });




module.exports = router;
